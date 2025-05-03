package services

import (
	"context"
	"errors"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"loomtales/database"
	"loomtales/lib"
	"loomtales/models"
	"os"
	"time"
)

const MemberInvitationCollection = "memberinvitations"

func GetMemberInvitations(filters bson.M, opt *options.FindOptions) []models.MemberInvitation {
	results := make([]models.MemberInvitation, 0)

	cursor := database.Find(MemberInvitationCollection, filters, opt)
	for cursor.Next(context.Background()) {
		var data models.MemberInvitation
		if cursor.Decode(&data) == nil {
			results = append(results, data)
		}
	}

	return results
}

func GetMemberInvitationsWithPagination(filters bson.M, opt *options.FindOptions, query models.Query) models.Result {
	results := GetMemberInvitations(filters, opt)

	count := database.Count(MemberInvitationCollection, filters)

	pagination := query.GetPagination(count)

	result := models.Result{
		Data:       results,
		Pagination: pagination,
		Query:      query,
	}

	return result
}

func CreateMemberInvitation(params models.MemberInvitation) (bool, error) {
	params.CreatedAt = time.Now()
	params.UpdatedAt = time.Now()

	_, err := database.InsertOne(MemberInvitationCollection, params)
	if err != nil {
		return false, err
	}

	return true, nil
}

func GetMemberInvitation(filter bson.M, opts *options.FindOneOptions, includeDetail bool) *models.MemberInvitation {
	var data models.MemberInvitation
	err := database.FindOne(MemberInvitationCollection, filter, opts).Decode(&data)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil
		}
		return nil
	}

	return &data
}

func UpdateMemberInvitation(id string, params interface{}) (*mongo.UpdateResult, error) {
	filters := bson.M{"id": id}

	res, err := database.UpdateOne(MemberInvitationCollection, filters, params)

	if res == nil {
		return nil, err
	}

	return res, nil
}

func DeleteMemberInvitation(id string) (*mongo.DeleteResult, error) {
	filter := bson.M{"id": id}

	res, err := database.DeleteOne(MemberInvitationCollection, filter)

	if res == nil {
		return nil, err
	}

	return res, nil
}

func SendMemberInvitation(params models.InvitationMail) error {
	token, err := lib.GenerateToken(params.Email)
	if err != nil {
		return err
	}

	invitationConfirmUrl := fmt.Sprintf("%s/member/invite/confirm/%s", os.Getenv("FRONTEND_URL"), *token)
	params.Link = invitationConfirmUrl
	params.SupportEmail = os.Getenv("SUPPORT_EMAIL")
	mailRequest := models.SendMailRequest{
		To:           params.Email,
		Subject:      "You’ve been invited to join a workspace on Loomtales.",
		Data:         params,
		TemplatePath: "templates/invitation-member.html",
	}

	err = SendMail(mailRequest)
	if err != nil {
		return err
	}

	return nil
}
