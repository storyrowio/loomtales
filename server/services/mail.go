package services

import (
	"encoding/json"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"loomtales/lib"
	"loomtales/models"
)

func SendMail(params models.SendMailRequest) error {
	setting := GetSetting(bson.M{"code": "mail", "status": true}, nil)
	if setting == nil {
		return errors.New("No Mail Setting Found")
	}

	var mailSetting models.MailSetting
	a, _ := json.Marshal(setting.Setting)
	err := json.Unmarshal(a, &mailSetting)
	if err != nil {
		return err
	}

	params.MailSetting = mailSetting

	err = lib.SendEmail(params)
	if err != nil {
		return err
	}

	return nil
}
