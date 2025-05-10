package models

type Media struct {
	Id          string   `json:"id"`
	WorkspaceId string   `json:"workspaceId" bson:"workspaceId" required:"true"`
	FileInfoId  string   `json:"fileInfoId" bson:"fileInfoId"`
	FileName    string   `json:"fileName" bson:"fileName"`
	Url         string   `json:"url"`
	FileInfo    FileInfo `json:"fileInfo" bson:"-"`
	BasicDate   `bson:",inline"`
}
