package controllers

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"loomtales/models"
	"loomtales/services"
	"net/http"
	"strings"
	"time"
)

func GetMedias(c *gin.Context) {
	var query models.Query
	err := c.ShouldBindQuery(&query)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	filters := query.GetQueryFind()
	opts := query.GetOptions()

	results := services.GetMediasWithPagination(filters, opts, query)

	c.JSON(http.StatusOK, models.Response{Data: results})
	return
}

func CreateMedia(c *gin.Context) {
	profile := services.GetCurrentUser(c.Request)

	jsonData := c.PostForm("json")
	if jsonData == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing JSON data"})
		return
	}

	var request models.Media
	err := json.Unmarshal([]byte(jsonData), &request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid form"})
		return
	}

	path := profile.Id + "/" + request.WorkspaceId + "/" + request.FileName

	file := form.File["file"]
	fileRes, err := services.UploadToCloudinary(file[0], path)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	request.Id = uuid.New().String()
	request.CreatedAt = time.Now()
	request.UpdatedAt = time.Now()

	fileInfo := models.FileInfo{
		Id:       uuid.New().String(),
		UserId:   profile.Id,
		FileName: fileRes.FileName,
		Path:     fileRes.Path,
		Metadata: fileRes.Metadata,
		Url:      fileRes.Url,
		Driver:   fileRes.Driver,
		BasicDate: models.BasicDate{
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
	}

	request.FileInfoId = fileInfo.Id

	_, err = services.CreateMedia(request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	err = services.CreateFiles([]models.FileInfo{fileInfo})
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: request})
	return
}

func GetMediaById(c *gin.Context) {
	id := c.Param("id")

	result := services.GetMedia(bson.M{"id": id}, nil, true)
	if result == nil {
		c.JSON(http.StatusNotFound, models.Result{Data: "Data Not Found"})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: result})
}

func UpdateMedia(c *gin.Context) {
	id := c.Param("id")

	data := services.GetMedia(bson.M{"id": id}, nil, false)
	if data == nil {
		c.JSON(http.StatusNotFound, models.Result{Data: "Data Not Found"})
		return
	}

	var request models.Media
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	_, err = services.UpdateMedia(id, request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(200, models.Response{Data: request})
}

func DeleteMedia(c *gin.Context) {
	ids := c.Param("ids")
	splittedIds := strings.Split(ids, ",")

	_, err := services.DeleteMedia(splittedIds)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: "Failed Delete Data"})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: "Success"})
}
