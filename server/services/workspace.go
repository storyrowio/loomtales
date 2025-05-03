package services

import (
	"context"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"loomtales/database"
	"loomtales/models"
)

const WorkspaceCollection = "workspaces"

func GetWorkspaceMember(data []models.WorkspaceMemberRoleId) []models.WorkspaceMemberRole {
	members := make([]models.WorkspaceMemberRole, 0)

	for _, item := range data {
		member := models.WorkspaceMemberRole{}
		user := GetUser(bson.M{"id": item.UserId}, options.FindOne().SetProjection(bson.D{{"password", 0}}))
		if user != nil {
			member.User = *user
		}

		role := GetRole(bson.M{"id": item.RoleId}, nil, false)
		if role != nil {
			member.Role = *role
		}

		members = append(members, member)
	}

	return members
}

func GetWorkspaces(filters bson.M, opt *options.FindOptions) []models.Workspace {
	results := make([]models.Workspace, 0)

	cursor := database.Find(WorkspaceCollection, filters, opt)
	for cursor.Next(context.Background()) {
		var data models.Workspace
		if cursor.Decode(&data) == nil {
			results = append(results, data)
		}
	}

	return results
}

func GetWorkspacesWithPagination(filters bson.M, opt *options.FindOptions, query models.Query) models.Result {
	results := GetWorkspaces(filters, opt)

	count := database.Count(WorkspaceCollection, filters)

	pagination := query.GetPagination(count)

	result := models.Result{
		Data:       results,
		Pagination: pagination,
		Query:      query,
	}

	return result
}

func CreateWorkspace(params models.Workspace) (bool, error) {
	_, err := database.InsertOne(WorkspaceCollection, params)
	if err != nil {
		return false, err
	}

	return true, nil
}

func GetWorkspace(filter bson.M, opts *options.FindOneOptions, includeDetail bool) *models.Workspace {
	var data models.Workspace
	err := database.FindOne(WorkspaceCollection, filter, opts).Decode(&data)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil
		}
		return nil
	}

	if includeDetail {
		data.Members = GetWorkspaceMember(data.MemberRoleIds)
	}

	return &data
}

func UpdateWorkspace(id string, params interface{}) (*mongo.UpdateResult, error) {
	filters := bson.M{"id": id}

	res, err := database.UpdateOne(WorkspaceCollection, filters, params)

	if res == nil {
		return nil, err
	}

	return res, nil
}

func DeleteWorkspace(id string) (*mongo.DeleteResult, error) {
	filter := bson.M{"id": id}

	res, err := database.DeleteOne(WorkspaceCollection, filter)

	if res == nil {
		return nil, err
	}

	return res, nil
}
