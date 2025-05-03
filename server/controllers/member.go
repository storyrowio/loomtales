package controllers

import (
	"errors"
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

func GetMembers(c *gin.Context) {
	workspaceId := c.Param("workspaceId")

	invitation := services.GetMemberInvitations(bson.M{
		"workspaceId": workspaceId,
		"status":      bson.M{"$eq": models.PendingMemberInvitation},
	}, nil)
	workspace := services.GetWorkspace(bson.M{"id": workspaceId}, nil, true)

	result := struct {
		Invitations []models.MemberInvitation    `json:"invitations"`
		Members     []models.WorkspaceMemberRole `json:"members"`
	}{
		Invitations: invitation,
		Members:     workspace.Members,
	}

	c.JSON(http.StatusOK, models.Response{Data: result})
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

	for _, item := range request.Members {
		err = services.SendMemberInvitation(models.InvitationMail{
			InviterName:   profile.Name,
			WorkspaceName: workspace.Name,
			Email:         item.Email,
		})

		_, err = services.CreateMemberInvitation(models.MemberInvitation{
			Id:            uuid.New().String(),
			WorkspaceId:   workspace.Id,
			WorkspaceName: workspace.Name,
			InviterId:     profile.Id,
			InviterName:   profile.Name,
			Email:         item.Email,
			RoleId:        item.RoleId,
			ExpiresAt:     time.Now().Add(time.Hour * 24),
			Status:        models.PendingMemberInvitation,
			BasicDate: models.BasicDate{
				CreatedAt: time.Now(),
				UpdatedAt: time.Now(),
			},
		})
	}

	c.JSON(http.StatusOK, models.Response{Data: "Success"})
}

func ConfirmMemberInvitation(c *gin.Context) {
	request := struct {
		Token string `json:"token"`
	}{}
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	email, err := lib.VerifyToken(request.Token)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	invitation := services.GetMemberInvitation(bson.M{"email": email}, nil, false)
	if invitation == nil {
		c.JSON(http.StatusNotFound, models.Response{Data: fmt.Sprintf("invitation %s does not exist", email)})
		return
	}

	invitation.Status = models.SuccessMemberInvitation
	_, err = services.UpdateMemberInvitation(invitation.Id, invitation)
	if err != nil {
		log.Println("Error updating member invitation: ", err)
	}

	result := struct {
		CallbackUrl string `json:"callbackUrl"`
	}{}

	user := services.GetUser(bson.M{"email": email}, nil)
	if user == nil {
		result.CallbackUrl = fmt.Sprintf("/register?email=%s&workspace=%s", email, invitation.WorkspaceId)
	} else {
		result.CallbackUrl = fmt.Sprintf("/app?workspace=%s&action=invite-confirm", invitation.WorkspaceId)
	}

	c.JSON(http.StatusOK, models.Response{Data: result})
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

	newMembers := make([]models.WorkspaceMemberRoleId, 0)
	for _, member := range workspace.MemberRoleIds {
		if member.UserId == request.UserId {
			member.RoleId = request.RoleId
		}

		newMembers = append(newMembers, member)
	}

	workspace.MemberRoleIds = newMembers

	_, err = services.UpdateWorkspace(workspace.Id, workspace)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: "Success"})
}

func ResendMemberInvitation(c *gin.Context) {
	invitationId := c.Param("invitationId")

	invitation := services.GetMemberInvitation(bson.M{"id": invitationId}, nil, false)
	if invitation == nil {
		c.JSON(http.StatusNotFound, models.Response{Data: fmt.Sprintf("invitation %s does not exist", invitationId)})
		return
	}

	invitation.ExpiresAt = time.Now().Add(time.Hour * 24)

	_, err := services.UpdateMemberInvitation(invitation.Id, invitation)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	params := models.InvitationMail{
		InviterName:   invitation.InviterName,
		WorkspaceName: invitation.WorkspaceName,
		Email:         invitation.Email,
	}

	err = services.SendMemberInvitation(params)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: "Success"})
}
