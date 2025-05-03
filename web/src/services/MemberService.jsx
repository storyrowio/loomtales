import Api from "@/lib/api.jsx";

const memberEndpoint = "/member"
const GetMembers = (workspaceId) => {
    return Api.Instance.get(`${memberEndpoint}/${workspaceId}`)
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

const InviteMembers = (params) => {
    return Api.Instance.post(`${memberEndpoint}/invite`, params)
        .then(res => res.data);
};

const UpdateMemberRole = (params) => {
    return Api.Instance.post(`${memberEndpoint}/role`, params)
        .then(res => res.data);
};

const ConfirmMemberInvitation = (params) => {
    return Api.Instance.post(`${memberEndpoint}/invite/confirm`, params)
        .then(res => res.data);
};

const ResendMemberInvitation = (invitationId) => {
    return Api.Instance.patch(`${memberEndpoint}/resend-invite/${invitationId}`)
        .then(res => res.data);
};

const MemberService = {
    GetMembers,
    CreateMembers,
    GetMember,
    UpdateMember,
    DeleteMember,
    InviteMembers,
    ConfirmMemberInvitation,
    UpdateMemberRole,
    ResendMemberInvitation
};

export default MemberService;
