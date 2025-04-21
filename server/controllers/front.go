package controllers

import (
	"github.com/gin-gonic/gin"
	"loomtales/lib"
	"loomtales/models"
	"loomtales/services"
	"net/http"
)

func GetFrontSidebarMenus(c *gin.Context) {
	profile := services.GetCurrentUser(c.Request)

	menus := lib.GenerateSidebarMenus(profile.Permissions, nil)

	c.JSON(http.StatusOK, models.Response{Data: menus})
}
