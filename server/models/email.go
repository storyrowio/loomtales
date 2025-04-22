package models

type VerificationMail struct {
	Name         string `json:"name"`
	Link         string `json:"link"`
	SupportEmail string `json:"supportEmail"`
}
