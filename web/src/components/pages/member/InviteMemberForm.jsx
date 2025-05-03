import {useFormik} from "formik";
import {Input} from "@/components/ui/input.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Label} from "@/components/ui/label.jsx";
import {PlusIcon} from "lucide-react";
import MemberService from "@/services/MemberService.jsx";
import {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import * as React from "react";
import useSWR from "swr";
import RolePermissionService from "@/services/RolePermissionService.jsx";

export default function InviteMemberForm(props) {
    const { workspaceId, onRefresh } = props;
    const [open, setOpen] = useState(false);

    const { data: resRoles } = useSWR('/api/roles',
        () => RolePermissionService.GetRoles({}));

    const formik = useFormik({
        initialValues: { members: [{email: '', roleId: ''}] },
        onSubmit: values => handleSubmit(values)
    });

    const addRow = () => {
        formik.setFieldValue('members', [...formik.values.members, {email: '', roleId: ''}]);
    };

    const handleKeyDown = (e) => {
        console.log('E', e.key)
        if (e.key === "Enter") {
            e.preventDefault()
            addRow();
        }
    };

    const handleChangeRole = (index, value) => {
        formik.setFieldValue(`members[${index}].roleId`, value)
    };

    const handleSubmit = (values) => {
        return MemberService.InviteMembers({
            workspaceId: workspaceId,
            members: values.members
        }).then(() => {
            setOpen(false);
            onRefresh();
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(!open)}>
                    Invite Member
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-xl lg:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Member Invitation</DialogTitle>
                    <DialogDescription>
                        Invite member for the collaboration.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit}>
                    <div className="min-h-[300px] flex flex-col gap-4">
                        {formik.values.members.map((e, i) => (
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Enter email address"
                                    type="email"
                                    name={`members[${i}].email`}
                                    onChange={formik.handleChange}
                                    onKeyDown={handleKeyDown}
                                    value={formik.values.members[i].email}
                                />
                                <Select
                                    value={e.role?.id}
                                    onValueChange={(val) => handleChangeRole(i, val)}>
                                    <SelectTrigger
                                        className="w-36"
                                        aria-label="Select role">
                                        <SelectValue placeholder="Select role"/>
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {resRoles?.map((item, j) => (
                                            <SelectItem key={j} value={item.id} className="rounded-lg">
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="icon" onClick={addRow}>
                                    <PlusIcon/>
                                </Button>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button type="submit">Invite</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
