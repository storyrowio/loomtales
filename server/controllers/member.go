package controllers

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"loomtales/lib"
	"loomtales/models"
	"loomtales/services"
	"net/http"
	"os"
	"time"
)

func GetMembers(c *gin.Context) {
	workspaceId := c.Param("workspaceId")

	invitation := services.GetMemberInvitations(bson.M{"workspaceId": workspaceId}, nil)
	workspace := services.GetWorkspace(bson.M{"id": workspaceId}, nil, true)
	members := workspace.ConvertWorkspaceMemberResult(invitation)

	c.JSON(http.StatusOK, models.Response{Data: members})
}

func InviteMember(c *gin.Context) {
	var request models.InviteMemberRequest
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	profile := services.GetCurrentUser(c.Request)
	if profile == nil {
		c.JSON(http.StatusUnauthorized, models.Response{Data: errors.New("no user found")})
		return
	}

	workspace := services.GetWorkspace(bson.M{"id": request.WorkspaceId}, nil, false)
	if workspace == nil {
		c.JSON(http.StatusNotFound, models.Response{Data: fmt.Sprintf("workspace %s does not exist", request.WorkspaceId)})
	}

	for _, email := range request.Emails {
		token, err := lib.GenerateToken(email)
		if err != nil {
			c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
			return
		}

		invitationConfirmUrl := fmt.Sprintf("%s/invite-member-confirm/%s", os.Getenv("FRONTEND_URL"), token)
		mailData := models.InvitationMail{
			InviterName:   profile.Name,
			WorkspaceName: workspace.Name,
			Email:         email,
			Link:          invitationConfirmUrl,
			SupportEmail:  os.Getenv("SUPPORT_EMAIL"),
		}
		mailRequest := models.SendMailRequest{
			To:           email,
			Subject:      "You’ve been invited to join a workspace on Loomtales.",
			Data:         mailData,
			TemplatePath: "templates/invitation-member.html",
		}

		err = services.SendMail(mailRequest)
		if err != nil {
			log.Println("Error sending email:", err)
			c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		}

		_, err = services.CreateMemberInvitation(models.MemberInvitation{
			WorkspaceId: workspace.Id,
			InviterId:   profile.Id,
			Email:       email,
			ExpiresAt:   time.Now().Add(time.Hour * 24),
			Status:      models.PendingMemberInvitation,
		})
	}

	c.JSON(http.StatusOK, models.Response{Data: "Success"})
}

func UpdateMemberRole(c *gin.Context) {
	request := struct {
		WorkspaceId string `json:"workspaceId"`
		UserId      string `json:"userId"`
		RoleId      string `json:"roleId"`
	}{}

	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	workspace := services.GetWorkspace(bson.M{"id": request.WorkspaceId}, nil, false)

	newMembers := make([]models.WorkspaceMemberRole, 0)
	for _, member := range workspace.Members {
		if member.UserId == request.UserId {
			member.RoleId = request.RoleId
		}

		newMembers = append(newMembers, member)
	}

	workspace.Members = newMembers

	_, err = services.UpdateWorkspace(workspace.Id, workspace)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: "Success"})
}
