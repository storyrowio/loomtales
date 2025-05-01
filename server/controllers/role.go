package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"loomtales/models"
	"loomtales/services"
	"net/http"
	"time"
)

func GetRoles(c *gin.Context) {
	var query models.Query
	err := c.ShouldBindQuery(&query)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	profile := services.GetCurrentUser(c.Request)

	filters := query.GetQueryFind()
	opts := query.GetOptions()

	roles := services.GetRoles(filters, opts)

	results := make([]models.Role, 0)
	for _, role := range roles {
		if profile.Role.RoleType != models.SystemAdminRole && role.RoleType == models.SystemAdminRole {
			continue
		}
		results = append(results, role)
	}

	c.JSON(http.StatusOK, models.Response{Data: results})
	return
}

func CreateRole(c *gin.Context) {
	var request models.Role
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(400, models.Response{Data: err.Error()})
		return
	}

	request.Id = uuid.New().String()
	request.CreatedAt = time.Now()
	request.UpdatedAt = time.Now()

	_, err = services.CreateRole(request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: request})
	return
}

func GetRoleById(c *gin.Context) {
	id := c.Param("id")

	result := services.GetRole(bson.M{"id": id}, nil, false)
	if result == nil {
		c.JSON(http.StatusNotFound, models.Result{Data: "Data Not Found"})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: result})
}

func UpdateRole(c *gin.Context) {
	id := c.Param("id")

	data := services.GetRole(bson.M{"id": id}, nil, false)
	if data == nil {
		c.JSON(http.StatusNotFound, models.Result{Data: "Data Not Found"})
		return
	}

	var request map[string]interface{}
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	_, err = services.UpdateRole(id, request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(200, models.Response{Data: request})
}

func DeleteRole(c *gin.Context) {
	id := c.Param("id")

	_, err := services.DeleteRole(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: "Failed Delete Data"})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: "Success"})
}

func AttachPermissionsToRole(c *gin.Context) {
	request := struct {
		RoleId      string   `json:"roleId"`
		Permissions []string `json:"permissions"`
	}{}
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	role := services.GetRole(bson.M{"id": request.RoleId}, nil, false)
	if role == nil {
		c.JSON(http.StatusNotFound, models.Response{Data: err.Error()})
		return
	}

	role.UpdatedAt = time.Now()
	role.PermissionIds = append(role.PermissionIds, request.Permissions...)
	_, err = services.UpdateRole(role.Id, role)
	if err != nil {
		c.JSON(http.StatusNotFound, models.Response{Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: role})
}
