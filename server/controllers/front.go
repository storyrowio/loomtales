package controllers

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"loomtales/models"
	"loomtales/services"
	"net/http"
)

func GetUserFrontSidebarMenus(c *gin.Context) {
	profile := services.GetCurrentUser(c.Request)
	if profile == nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: "Unauthorized"})
		return
	}

	menus, err := services.GetUserFrontSidebarMenus(*profile)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: menus})
}

func GetFrontSidebarMenus(c *gin.Context) {
	menus := services.GetFrontSidebarMenus(bson.M{}, nil)

	c.JSON(http.StatusOK, models.Response{Data: menus})
}

func CreateFrontSidebarMenus(c *gin.Context) {
	request := struct {
		Menus []models.FrontSidebarMenu `json:"menus"`
	}{}
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	_, err = services.CreateManyFrontSidebarMenu(request.Menus)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: request})
	return
}
