package controllers

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"log"
	"loomtales/lib"
	"loomtales/models"
	"loomtales/services"
	"mime/multipart"
	"net/http"
	"strings"
	"sync"
	"time"
)

func UploadFile(c *gin.Context) {
	jsonData := c.PostForm("json")
	if jsonData == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing JSON data"})
		return
	}

	var request models.FileRequest
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

	files := form.File["files[]"]

	profile := services.GetCurrentUser(c.Request)
	if profile == nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	// If driver is google
	googleFolder := ""
	if request.Driver == models.GoogleDriveDriver {
		folder, err := lib.GetOrCreateDefaultFolder(request.Token)
		if err != nil {
			c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
			return
		}
		googleFolder = *folder
	}

	var wg sync.WaitGroup
	results := make([]models.UploadResult, 0)

	for i, file := range files {
		wg.Add(1)
		go func(i int, file *multipart.FileHeader) {
			defer wg.Done()
			if request.Driver == models.GoogleDriveDriver {
				result, err := services.UploadToGoogleDrive(file, googleFolder, request.Token)
				if err == nil {
					results = append(results, *result)
				}
			} else {
				result, err := services.UploadToCloudinary(file, profile.Id)
				if err == nil {
					results = append(results, *result)
				}
			}
		}(i, file)
	}

	wg.Wait()

	if len(results) == 0 {
		c.JSON(http.StatusBadRequest, models.Response{Data: "Upload Failed"})
		return
	}

	medias := make([]models.Media, 0)
	params := make([]models.FileInfo, 0)
	for _, val := range results {
		fileInfo := models.FileInfo{
			Id:       uuid.New().String(),
			UserId:   profile.Id,
			FileName: val.FileName,
			Path:     val.Path,
			Metadata: val.Metadata,
			Url:      val.Url,
			Driver:   val.Driver,
			BasicDate: models.BasicDate{
				CreatedAt: time.Now(),
				UpdatedAt: time.Now(),
			},
		}
		params = append(params, fileInfo)

		if request.IsMedia {
			media := models.Media{
				Id:          uuid.New().String(),
				WorkspaceId: request.WorkspaceId,
				FileInfoId:  fileInfo.Id,
				FileName:    val.FileName,
				Url:         val.Url,
				BasicDate: models.BasicDate{
					CreatedAt: time.Now(),
					UpdatedAt: time.Now(),
				},
			}

			_, err := services.CreateMedia(models.Media{
				Id:          uuid.New().String(),
				WorkspaceId: request.WorkspaceId,
				FileInfoId:  fileInfo.Id,
				FileName:    val.FileName,
				Url:         val.Url,
				BasicDate: models.BasicDate{
					CreatedAt: time.Now(),
					UpdatedAt: time.Now(),
				},
			})
			if err != nil {
				log.Println("Error create media", err)
			}

			medias = append(medias, media)
		}
	}

	if len(params) > 0 {
		err = services.CreateFiles(params)
		if err != nil {
			c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
			return
		}
	}

	c.JSON(http.StatusOK, models.Response{Data: map[string]interface{}{
		"files":  results,
		"medias": medias,
	}})
}

func DestroyFile(c *gin.Context) {
	request := struct {
		Token string `json:"token"`
	}{}
	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	profile := services.GetCurrentUser(c.Request)
	if profile == nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	ids := c.Param("ids")
	splittedIds := strings.Split(ids, ",")

	err = services.DeleteFiles(splittedIds, profile.Id, request.Token)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: "Success"})
}
