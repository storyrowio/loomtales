import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import * as React from "react";
import {useEffect, useState} from "react";
import {useSelector} from "@/store/index.jsx";
import {GenerateUniqueId} from "@/lib/helper.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";
import LoaderUpload from "@/assets/images/loader-upload.svg";
import GeneralService from "@/services/GeneralService.jsx";
import {CheckCircle2Icon} from "lucide-react";

export default function MediaDialog(props) {
    const { buttonTrigger, medias, mutate, onAdd } = props;
    const { activeWorkspace } = useSelector(state => state.app);
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [completedUpload, setCompletedUpload] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        if (medias?.length > 0) {
            setFiles([...medias]);
        }
    }, [medias]);

    const handleSelectItems = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems?.filter(e => e !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleChangeImage = async (e) => {
        const file = e.target.files[0];
        const preview = URL.createObjectURL(file);
        const fileInfo = {
            id: GenerateUniqueId(6),
            file: file,
            preview: preview,
            status: 'pending'
        };
        setFiles([...files, fileInfo]);

        await upload(file, fileInfo?.id);
    };

    const upload = async (file, id) => {
        const params = {
            workspaceId: activeWorkspace?.id,
            isMedia: true
        };

        const formData = new FormData();
        formData.append("json", JSON.stringify(params));
        formData.append("files[]", file);

        return GeneralService.UploadFile(formData)
            .then(() => {
                mutate();
                setCompletedUpload([...completedUpload, id]);
            });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {buttonTrigger}
            </DialogTrigger>
            <DialogContent className="min-w-[90%] max-w-[90%] lg:max-w-1/2">
                <DialogHeader>
                    <DialogTitle>Select Media</DialogTitle>
                </DialogHeader>
                {files?.length === 0 ? (
                    <div className="w-full py-6 flex justify-center">
                        <p>No Media</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {files.map((e, i) => (
                            <Card key={i} onClick={() => handleSelectItems(e)} className="p-2">
                                <CardContent className="p-0">
                                    <div className="relative">
                                        <img
                                            src={e.preview}
                                            alt="preview"
                                            className="aspect-square object-contain w-full rounded-lg"
                                        />
                                        {selectedItems?.includes(e) && (
                                            <>
                                                <div className="w-full h-full absolute top-0 left-0 bg-gray-950 rounded-lg opacity-25"/>
                                                <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center ">
                                                    <CheckCircle2Icon className="w-24 h-24 text-white"/>
                                                </div>
                                            </>
                                        )}
                                        {!completedUpload.includes(e.id) && !e.fileInfoId && (
                                            <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-gray-950 rounded-lg opacity-15">
                                                <img
                                                    src={LoaderUpload}
                                                    alt="loader"
                                                    className="w-30 h-30"
                                                />
                                            </div>
                                        )}
                                    </div>

                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
                <DialogFooter>
                    <label htmlFor="add-file">
                        <div
                            className="w-48 py-2 bg-secondary rounded-lg shadow-md text-center text-white text-sm">
                            Upload File(s)
                        </div>
                        <input
                            id="add-file"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleChangeImage}
                        />
                    </label>
                    <Button onClick={() => {
                        onAdd(selectedItems);
                        setOpen(false);
                    }}>
                        Add Medias {selectedItems.length > 0 && `(${selectedItems.length})`}
                    </Button>
                    <Button color="default" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
