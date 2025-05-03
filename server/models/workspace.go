package models

import (
	"time"
)

const (
	PendingMemberInvitation = "pending"
	ExpiredMemberInvitation = "expired"
	SuccessMemberInvitation = "success"
)

type WorkspaceMemberRoleId struct {
	UserId string `json:"userId" bson:"userId"`
	RoleId string `json:"roleId" bson:"roleId"`
}

type WorkspaceMemberRole struct {
	User User `json:"user"`
	Role Role `json:"role"`
}

type Workspace struct {
	Id            string                  `json:"id"`
	Name          string                  `json:"name"`
	Description   string                  `json:"description"`
	MemberRoleIds []WorkspaceMemberRoleId `json:"memberRoleIds"`
	Members       []WorkspaceMemberRole   `json:"members" bson:"-"`
	BasicDate     `bson:",inline"`
}

type MemberInvitation struct {
	Id            string    `json:"id"`
	WorkspaceId   string    `json:"workspaceId" bson:"workspaceId"`
	WorkspaceName string    `json:"workspaceName" bson:"workspaceName"`
	InviterId     string    `json:"inviterId" bson:"inviterId"` // User id
	InviterName   string    `json:"inviterName" bson:"inviterName"`
	Email         string    `json:"email" bson:"email"`
	RoleId        string    `json:"roleId" bson:"roleId"`
	ExpiresAt     time.Time `json:"expiresAt" bson:"expiresAt"`
	Status        string    `json:"status" bson:"status" default:"pending"`
	BasicDate     `bson:",inline"`
}

type WorkspaceMemberResult struct {
	InvitationId string    `json:"invitationId" bson:"invitationId"`
	Email        string    `json:"email" bson:"email"`
	ExpiresAt    time.Time `json:"expiresAt" bson:"expiresAt"`
	UserId       string    `json:"userId" bson:"userId"`
	User         User      `json:"user"`
	Role         Role      `json:"role"`
	Status       string    `json:"status" bson:"status"`
}
