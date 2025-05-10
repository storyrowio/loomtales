import Api from "@/lib/api.jsx";

const UploadFile = (params) => {
    return Api.Instance.post('/upload', params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(res => res?.data);
};

const GeneralService = {
    UploadFile
};

export default GeneralService;
