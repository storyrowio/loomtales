import Api from "@/lib/api.jsx";

const mediaPath = '/media';

const GetMedias = (query) => {
    return Api.Instance.get(`${mediaPath}`, {params: query})
        .then(res => res.data?.data);
};

const CreateMedia = (params) => {
    return Api.Instance.post(`${mediaPath}`, params)
        .then(res => res?.data);
};

const GetMedia = (id) => {
    return Api.Instance.get(`${mediaPath}/${id}`)
        .then(res => res?.data?.data);
};

const UpdateMedia = (id, params) => {
    return Api.Instance.patch(`${mediaPath}/${id}`, params)
        .then(res => res?.data);
};

const DeleteMedia = (id) => {
    return Api.Instance.get(`${mediaPath}/${id}`)
        .then(res => res?.data);
};

const MediaService = {
    GetMedias,
    CreateMedia,
    GetMedia,
    UpdateMedia,
    DeleteMedia
};

export default MediaService;
