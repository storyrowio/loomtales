import Api from "@/lib/api.jsx";
import AppStorage from "@/lib/storage.jsx";
import {AUTH_TOKEN} from "@/constants/storage.jsx";

const rolePath = "/role";

const GetRoles = (query) => {
    return Api.Instance.get('/admin/role', {params: query})
        .then(res => res?.data);
};

const CreateRole = (params) => {
    return Api.Instance.post(`/admin${rolePath}`, params)
        .then(res => res?.data);
};

const GetRole = (id) => {
    return Api.Instance.get(`/admin${rolePath}/${id}`)
        .then(res => res?.data?.data);
};

const UpdateRole = (id, params) => {
    return Api.Instance.patch(`/admin${rolePath}/${id}`, params)
        .then(res => res?.data);
};

const DeleteRole = (id) => {
    return Api.Instance.get(`/admin${rolePath}/${id}`)
        .then(res => res?.data);
};

const GetPermissions = (query) => {
    return Api.Instance.get('/admin/permission', {params: query})
        .then(res => res?.data?.data);
};

const RolePermissionService = {
    GetRoles,
    CreateRole,
    GetRole,
    UpdateRole,
    DeleteRole,
    GetPermissions
};

export default RolePermissionService;
