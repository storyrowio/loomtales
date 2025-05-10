package services

import (
	"context"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"loomtales/database"
	"loomtales/models"
	"time"
)

const MediaCollection = "medias"

func GetMedias(filters bson.M, opt *options.FindOptions, includeDetail bool) []models.Media {
	results := make([]models.Media, 0)

	cursor := database.Find(MediaCollection, filters, opt)
	for cursor.Next(context.Background()) {
		var data models.Media
		if cursor.Decode(&data) == nil {
			if includeDetail {
				fileInfo := GetFile(bson.M{"id": data.FileInfoId}, nil)
				if fileInfo != nil {
					data.FileInfo = *fileInfo
				}
			}

			results = append(results, data)
		}
	}

	return results
}

func GetMediasWithPagination(filters bson.M, opt *options.FindOptions, query models.Query) models.Result {
	results := GetMedias(filters, opt, true)

	count := database.Count(MediaCollection, filters)

	pagination := query.GetPagination(count)

	result := models.Result{
		Data:       results,
		Pagination: pagination,
		Query:      query,
	}

	return result
}

func CreateMedia(params models.Media) (bool, error) {
	params.CreatedAt = time.Now()
	params.UpdatedAt = time.Now()

	_, err := database.InsertOne(MediaCollection, params)
	if err != nil {
		return false, err
	}

	return true, nil
}

func GetMedia(filter bson.M, opts *options.FindOneOptions, includeDetail bool) *models.Media {
	var data models.Media
	err := database.FindOne(MediaCollection, filter, opts).Decode(&data)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil
		}
		return nil
	}

	if includeDetail {
		fileInfo := GetFile(bson.M{"id": data.FileInfoId}, nil)
		if fileInfo != nil {
			data.FileInfo = *fileInfo
		}
	}

	return &data
}

func UpdateMedia(id string, params interface{}) (*mongo.UpdateResult, error) {
	filters := bson.M{"id": id}

	res, err := database.UpdateOne(MediaCollection, filters, params)

	if res == nil {
		return nil, err
	}

	return res, nil
}

func DeleteMedia(ids []string) (*mongo.DeleteResult, error) {
	filter := bson.M{"id": bson.M{"$in": ids}}

	res, err := database.DeleteMany(MediaCollection, filter)
	if res == nil {
		return nil, err
	}

	return res, nil
}
