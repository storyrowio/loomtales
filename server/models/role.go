package models

const (
	SystemAdminRole = "systemadmin"
	AdminRole       = "admin"
	ManagerRole     = "manager"
	ContributorRole = "contributor"
)

type Role struct {
	Id            string       `json:"id"`
	Name          string       `json:"name" required:"true"`
	Code          string       `json:"code"`
	PermissionIds []string     `json:"permissionIds"` // permission ids
	Permissions   []Permission `json:"permissions"`
	RoleType      string       `json:"roleType" bson:"roleType"`
	BasicDate     `bson:",inline"`
}

type Permission struct {
	Id          string `json:"id"` // user:create, user:read
	Name        string `json:"name"`
	Feature     string `json:"feature"`
	Description string `json:"description"`
}

type UserProjectRole struct {
	UserId    string `json:"userId" bson:"userId"`
	ProjectId string `json:"projectId" bson:"projectId"`
	RoleId    string `json:"roleId" bson:"roleId"`
}
