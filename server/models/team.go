package models

type InviteMemberRequest struct {
	WorkspaceId string `json:"workspaceId"`
	Members     []struct {
		Email  string `json:"email"`
		RoleId string `json:"roleId"`
	} `json:"members"`
}
