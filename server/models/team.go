package models

type InviteMemberRequest struct {
	WorkspaceId string   `json:"workspaceId"`
	Emails      []string `json:"emails"`
}
