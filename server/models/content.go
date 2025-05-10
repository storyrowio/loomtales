package models

type Content struct {
	Id          string   `json:"id"`
	UserId      string   `json:"userId" bson:"userId"`
	WorkspaceId string   `json:"workspaceId" bson:"workspaceId"`
	Title       string   `json:"title" required:"true"`
	Content     string   `json:"content" required:"true"`
	MediaIds    []string `json:"mediaIds" bson:"mediaIds"` // Media ids
	Medias      []Media  `json:"medias" bson:"-"`
	BasicDate   `bson:",inline"`
}
