package models

type FrontSidebarMenu struct {
	Id           string             `json:"id"`
	Title        string             `json:"title"`
	Icon         string             `json:"icon"`
	Path         string             `json:"path"`
	Permissions  []string           `json:"permissions"`
	Children     []FrontSidebarMenu `json:"children"`
	SectionTitle bool               `json:"sectionTitle" bson:"sectionTitle"`
	BasicDate    `bson:",inline"`
}
