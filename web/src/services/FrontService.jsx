import Api from "@/lib/api.jsx";

const frontSidebarMenuEndpoint = "/front/sidebar-menu"

const GetUserSidebarMenus = (query) => {
    return Api.Instance.get(frontSidebarMenuEndpoint, {params: query})
        .then(res => res.data?.data);
};

const GetSidebarMenus = (query) => {
    return Api.Instance.get(`/admin${frontSidebarMenuEndpoint}`, {params: query})
        .then(res => res.data?.data);
};

const CreateSidebarMenus = (params) => {
    return Api.Instance.post(`/admin${frontSidebarMenuEndpoint}`, params)
        .then(res => res?.data);
};

const GetSidebarMenu = (id) => {
    return Api.Instance.get(`/admin${frontSidebarMenuEndpoint}/${id}`)
        .then(res => res.data?.data);
};

const UpdateSidebarMenu = (id, params) => {
    return Api.Instance.patch(`/admin${frontSidebarMenuEndpoint}/${id}`, params)
        .then(res => res.data?.data);
};

const DeleteSidebarMenu = (id) => {
    return Api.Instance.delete(`/admin${frontSidebarMenuEndpoint}/${id}`)
        .then(res => res.data?.data);
};

const FrontService = {
    GetUserSidebarMenus,
    GetSidebarMenus,
    CreateSidebarMenus,
    GetSidebarMenu,
    UpdateSidebarMenu,
    DeleteSidebarMenu
};

export default FrontService;
