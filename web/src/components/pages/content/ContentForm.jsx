import PageTitle from "@/components/shared/PageTitle.jsx";
import * as React from "react";
import {Card, CardContent} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {useFormik} from "formik";
import {Textarea} from "@/components/ui/textarea.jsx";
import {DateTimePicker} from "@/components/ui/datetimepicker.jsx";
import {useState} from "react";
import {Plus} from "lucide-react";
import MediaDialog from "@/components/shared/dialog/MediaDialog.jsx";
import useSWR from "swr";
import MediaService from "@/services/MediaService.jsx";
import {useSelector} from "@/store/index.jsx";
import {Button} from "@/components/ui/button.jsx";
import ContentPreviewSection from "@/components/pages/content/ContentPreviewSection.jsx";

export default function ContentForm({ data }) {
    const { activeWorkspace } = useSelector(state => state.app);
    const [mediaDialog, setMediaDialog] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            medias: [],
            mediaPreviews: []
        },
        onSubmit: values => handleSubmit(values)
    });

    const { data: resMedias, mutate } = useSWR(
        activeWorkspace?.id ? '/api/media' : null,
        () => MediaService.GetMedias({workspace: activeWorkspace?.id}),
        {revalidateOnFocus: false});

    const handleAddMedias = (val) => {
        const newMedias = Array.from([...formik.values.medias, ...val]
            .reduce((m, o) => m.set(o.id, o), new Map)
            .values()
        )

        formik.setFieldValue('medias', [...newMedias]);
    };

    const handleSubmit = (values) => {

    };

    return (
        <>
            <PageTitle title="Posts" items={[
                { title: "Home", href: "/app" },
                { title: "Contents", href: "/app/content" },
                { title: `${data?.id ? 'Update' : 'Create'} Content` }
            ]}/>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                <Card>
                    <CardContent>
                        <form
                            className="grid gap-3">
                            <div className="grid gap-1">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    required
                                    name="title"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                />
                            </div>
                            <div className="grid gap-1">
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    required
                                    name="content"
                                    onChange={formik.handleChange}
                                    value={formik.values.content}
                                    placeholder="Content post ..."
                                    className="min-h-96"/>
                            </div>
                            <div className="grid gap-1">
                                <Label htmlFor="content">Content</Label>
                                <DateTimePicker/>
                            </div>
                            <div className="grid gap-1">
                                <div className="my-4 flex justify-between items-center">
                                    <Label htmlFor="content">Media</Label>
                                    <MediaDialog
                                        medias={resMedias?.data?.map((e) => ({...e, preview: e.url}))}
                                        mutate={mutate}
                                        onAdd={(val) => handleAddMedias(val)}
                                        value={formik.values.medias ?? []}
                                        buttonTrigger={<Button size="sm">
                                            Add Media
                                        </Button>}/>

                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {formik.values.medias.map((e, i) => (
                                        <Card key={i} className="p-2">
                                            <img
                                                src={e.url}
                                                alt={`${e.name}-${i}`}
                                                className="w-full aspect-square object-contain rounded-lg"
                                            />
                                        </Card>
                                    ))}
                                </div>

                            </div>
                        </form>
                    </CardContent>
                </Card>
                <ContentPreviewSection formik={formik}/>
            </div>
        </>
    )
}
