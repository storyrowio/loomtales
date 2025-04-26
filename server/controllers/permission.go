package controllers

import (
	"github.com/gin-gonic/gin"
	"loomtales/models"
	"loomtales/services"
	"net/http"
)

func GetPermissions(c *gin.Context) {
	var query models.Query

	err := c.ShouldBindQuery(&query)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	filters := query.GetQueryFind()
	opts := query.GetOptions()

	results := services.GetPermissions(filters, opts)

	c.JSON(http.StatusOK, models.Response{Data: results})
	return
}

func CreatePermissions(c *gin.Context) {
	request := struct {
		Permissions []models.Permission `json:"permissions"`
	}{}
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	_, err = services.CreateManyPermissions(request.Permissions)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: request})
	return
}
