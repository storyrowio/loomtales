import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {useFormik} from "formik";
import AuthService from "@/services/AuthService.jsx";
import {useNavigate} from "react-router";
import useSWR from "swr";
import FrontService from "@/services/FrontService.jsx";
import RolePermissionService from "@/services/RolePermissionService.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import * as React from "react";
import {Card, CardContent} from "@/components/ui/card.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";

export default function FrontSidebarMenuForm() {
    const navigate = useNavigate();
    const { data: resPermissions } = useSWR('/api/admin/permission',
        () => RolePermissionService.GetPermissions({}));

    const formik = useFormik({
        initialValues: {
            title: '',
            icon: '',
            path: '',
            permissions: [],
            children: [],
            sectionTitle: false
        },
        onSubmit: values => handleSubmit(values)
    });

    const handleChangePermission = (id) => {
        if (formik.values.permissions.includes(id)) {
            formik.setFieldValue('permissions', formik.values.permissions.filter(e => e !== id));
        } else {
            formik.setFieldValue('permissions', [...formik.values.permissions, id])
        }
    };

    const handleSubmit = (values) => {
        return AuthService.Login(values)
            .then(() => navigate('/app'));
    };

    return (
        <Card>
            <CardContent>
                <form
                    className="grid gap-6">
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
                        <Label htmlFor="icon">Icon</Label>
                        <Input
                            id="icon"
                            required
                            name="icon"
                            onChange={formik.handleChange}
                            value={formik.values.icon}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="path">Path</Label>
                        <Input
                            id="path"
                            required
                            name="path"
                            onChange={formik.handleChange}
                            value={formik.values.path}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="path">Section Title</Label>
                        <div className="py-3 items-top flex space-x-2">
                            <Checkbox
                                id="sectionTitle"
                                onCheckedChange={(checked) => formik.setFieldValue('sectionTitle', checked)}/>
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="sectionTitle"
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >Is Section Title?</label>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="title">Permissions</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {resPermissions?.map((e, i) => (
                                <div key={i} className="py-3 items-top flex space-x-2">
                                    <Checkbox id={e.id} onCheckedChange={() => handleChangePermission(e.id)}/>
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                            htmlFor={e.id}
                                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >{e.name}</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
