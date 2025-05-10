package models

import (
	"mime/multipart"
	"time"
)

const MediaCollection = "medias"

type Response struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

type File struct {
	File      *multipart.FileHeader   `form:"file"`
	MultiFile []*multipart.FileHeader `form:"file"`
}

type BasicDate struct {
	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt" bson:"updatedAt"`
}

type DefaultData struct {
	Users             []User             `json:"users"`
	Permissions       []Permission       `json:"permissions"`
	Roles             []Role             `json:"roles"`
	Settings          []Setting          `json:"settings"`
	FrontSidebarMenus []FrontSidebarMenu `json:"frontSidebarMenus"`
}
