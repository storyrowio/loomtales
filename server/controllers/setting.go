package controllers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"loomtales/lib"
	"loomtales/models"
	"loomtales/services"
	"net/http"
	"time"
)

func GetSettings(c *gin.Context) {
	var query models.Query
	err := c.ShouldBindQuery(&query)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	filters := query.GetQueryFind()
	opts := query.GetOptions()

	results := services.GetSettingsWithPagination(filters, opts, query)

	c.JSON(http.StatusOK, models.Response{Data: results})
}

func CreateSetting(c *gin.Context) {
	var request models.Setting

	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusOK, models.Response{Data: err.Error()})
		return
	}

	request.Id = uuid.New().String()
	request.CreatedAt = time.Now()
	request.UpdatedAt = time.Now()

	newSetting := map[string]interface{}{}
	for key, val := range request.Setting {
		if value, ok := val.(string); ok {
			encryptedVal, _ := lib.Encrypt(value)
			newSetting[key] = encryptedVal
		} else {
			newSetting[key] = val
		}
	}

	request.Setting = newSetting

	_, err = services.CreateSetting(request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	if request.Status {
		// Disable current active in same category
		activeSetting := services.GetSetting(bson.M{"status": true, "type": request.Type}, nil)
		if activeSetting != nil && activeSetting.Id != request.Id {
			activeSetting.Status = false
			activeSetting.UpdatedAt = time.Now()
			_, err = services.UpdateSetting(activeSetting.Id, activeSetting)
			if err != nil {
				log.Println("Failed to update active setting", err.Error())
			}
		}
	}

	c.JSON(http.StatusOK, models.Response{Data: request})
	return
}

func GetSettingById(c *gin.Context) {
	id := c.Param("id")

	result := services.GetSetting(bson.M{"id": id}, nil)
	if result == nil {
		c.JSON(http.StatusNotFound, models.Result{Data: "Data Not Found"})
		return
	}

	newSetting := map[string]interface{}{}
	for key, val := range result.Setting {
		if _, ok := val.(string); ok {
			decryptedVal, err := lib.Decrypt(fmt.Sprint(val))
			if err == nil {
				log.Println(decryptedVal)
				newSetting[key] = decryptedVal
			} else {
				log.Println(err.Error())
			}
		} else {
			newSetting[key] = val
		}
	}

	result.Setting = newSetting

	c.JSON(http.StatusOK, models.Response{Data: result})
}

func UpdateSetting(c *gin.Context) {
	id := c.Param("id")

	data := services.GetSetting(bson.M{"id": id}, nil)
	if data == nil {
		c.JSON(http.StatusNotFound, models.Result{Data: "Data Not Found"})
		return
	}

	var request models.Setting
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	request.Id = id
	request.CreatedAt = data.CreatedAt
	request.UpdatedAt = time.Now()

	newSetting := map[string]interface{}{}
	for key, val := range request.Setting {
		if value, ok := val.(string); ok {
			encryptedVal, _ := lib.Encrypt(value)
			newSetting[key] = encryptedVal
		} else {
			newSetting[key] = val
		}
	}

	request.Setting = newSetting

	_, err = services.UpdateSetting(id, request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	if request.Status {
		// Disable current active in same category
		activeSetting := services.GetSetting(bson.M{"status": true, "type": request.Type}, nil)
		if activeSetting != nil && activeSetting.Id != id {
			activeSetting.Status = false
			activeSetting.UpdatedAt = time.Now()
			_, err = services.UpdateSetting(activeSetting.Id, activeSetting)
			if err != nil {
				log.Println("Failed to update active setting", err.Error())
			}
		}
	}

	c.JSON(http.StatusOK, models.Response{Data: request})
}

func DeleteSetting(c *gin.Context) {
	id := c.Param("id")

	_, err := services.DeleteSetting([]string{id})
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: "Failed Delete Data"})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: "Success"})
}
