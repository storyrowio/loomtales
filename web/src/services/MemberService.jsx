import Api from "@/lib/api.jsx";

const memberEndpoint = "/member"
const GetMembers = (query) => {
    return Api.Instance.get(memberEndpoint, {params: query})
        .then(res => res.data?.data);
};
const CreateMembers = (params) => {
    return Api.Instance.post(memberEndpoint, params)
        .then(res => res?.data);
};
const GetMember = (id) => {
    return Api.Instance.get(`${memberEndpoint}/${id}`)
        .then(res => res.data?.data);
};
const UpdateMember = (id, params) => {
    return Api.Instance.patch(`${memberEndpoint}/${id}`, params)
        .then(res => res.data?.data);
};
const DeleteMember = (id) => {
    return Api.Instance.delete(`${memberEndpoint}/${id}`)
        .then(res => res.data?.data);
};

const FrontService = {
    GetMembers,
    CreateMembers,
    GetMember,
    UpdateMember,
    DeleteMember
};

export default FrontService;
