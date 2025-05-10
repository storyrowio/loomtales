import {useNavigate} from "react-router";
import {useFormik} from "formik";
import {ROLE_PATH} from "@/constants/paths.jsx";
import {useEffect, useMemo} from "react";
import useSWR from "swr";
import RolePermissionService from "@/services/RolePermissionService.jsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Button} from "@/components/ui/button.jsx";
import * as React from "react";
import PageTitle from "@/components/shared/PageTitle.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {RoleTypes} from "@/constants/constants.jsx";
import {Feature} from "@/constants/menus.jsx";

export default function RoleForm(props) {
    const {data} = props;
    const navigate = useNavigate();
    const { data: resPermissions } = useSWR('/api/admin/permission',
        () => RolePermissionService.GetPermissions({}));

    const formik = useFormik({
        initialValues: {
            name: '',
            code: '',
            roleType: '',
            permissionIds: []
        },
        onSubmit: values => handleSubmit(values)
    });

    useEffect(() => {
        if (data?.id) {
            formik.setValues(data);
        }
    }, [data?.id]);

    const permissionData = useMemo(() => {
        const data = {};

        if (resPermissions?.length > 0) {
            Object.keys(Feature).forEach(key => {
                const permissions = resPermissions?.filter(e => e.feature === key);
                if (permissions?.length > 0) {
                    data[key] = {
                        name: Feature[key].name,
                        permissions: permissions
                    }
                }
            });
        }

        return data;
    }, [resPermissions]);

    const handleChangeAllPermissions = (permissions) => {
        if (permissions.every(e => formik.values.permissionIds.includes(e))) {
            formik.setFieldValue('permissionIds', formik.values.permissionIds.filter(e => !permissions.includes(e)));
        } else {
            formik.setFieldValue('permissionIds', [...formik.values.permissionIds, ...permissions]);
        }
    };

    const handleChangePermission = (id) => {
        if (formik.values.permissionIds.includes(id)) {
            formik.setFieldValue('permissionIds', formik.values.permissionIds.filter(e => e !== id));
        } else {
            formik.setFieldValue('permissionIds', [...formik.values.permissionIds, id])
        }
    };

    const submit = (params) => {
        if (data?.id) {
            return RolePermissionService.UpdateRole(data?.id, params);
        }

        return RolePermissionService.CreateRole(params);
    };

    const handleSubmit = (values) => {
        return submit({...values})
            .then(() => {
                navigate(ROLE_PATH);
                formik.handleReset();
            })
    };

    return (
        <>
            <PageTitle
                title={`${data?.id ? 'Update' : 'Create'} Role`}
                items={[
                    { title: 'Home', href: '/app' },
                    { title: 'Role', href: '/app/role' },
                    { title: `${data?.id ? 'Update' : 'Create'} Role` },
                ]}/>
            <Card>
                <CardContent>
                    <form
                        className="grid gap-6"
                        onSubmit={formik.handleSubmit}>
                        <div className="grid gap-1">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                required
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="code">Code</Label>
                            <Input
                                id="code"
                                required
                                name="code"
                                onChange={formik.handleChange}
                                value={formik.values.code}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="name">Role Type</Label>
                            <Select value={formik.values.roleType}
                                    onValueChange={(val) => formik.setFieldValue('roleType', val)}>
                                <SelectTrigger
                                    className="w-full"
                                    aria-label="Select a value">
                                    <SelectValue placeholder="Select role type"/>
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {Object.keys(RoleTypes).map(key => (
                                        <SelectItem value={RoleTypes[key].value} className="rounded-lg">
                                            {RoleTypes[key].name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="title">Permissions</Label>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {Object.keys(permissionData).map(key => (
                                    <Card key={`feature-${key}`}>
                                        <CardHeader className="flex items-center">
                                            <Checkbox
                                                checked={permissionData[key].permissions.every(e => formik.values.permissionIds.includes(e.id))}
                                                onCheckedChange={() => handleChangeAllPermissions(permissionData[key].permissions?.map(e => e.id))}
                                            />
                                            <CardTitle>{permissionData[key]?.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {permissionData[key]?.permissions.map((item, j) => (
                                                <div key={`permission-${item.icon}-${j}`}
                                                     className="py-3 items-top flex space-x-2">
                                                    <Checkbox
                                                        id={item.id}
                                                        checked={formik.values.permissionIds.includes(item.id)}
                                                        onCheckedChange={() => handleChangePermission(item.id)}/>
                                                    <div className="grid gap-1.5 leading-none">
                                                        <label
                                                            htmlFor={item.id}
                                                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >{item.name}</label>
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}
