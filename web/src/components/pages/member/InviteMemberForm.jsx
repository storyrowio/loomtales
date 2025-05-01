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

export default function InviteMemberForm(props) {
    const { workspaceId } = props;
    const [open, setOpen] = useState(false);

    const formik = useFormik({
        initialValues: { emails: [''] },
        onSubmit: values => handleSubmit(values)
    });

    const addRow = () => {
        formik.setFieldValue('emails', [...formik.values.emails, '']);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addRow();
        }
    }

    const handleSubmit = (values) => {
        return MemberService.InviteMembers({
            workspaceId: workspaceId,
            emails: values.emails
        }).then(() => setOpen(false));
    };

    return (
        <Dialog open={open}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(!open)}>
                    Invite Member
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Member Invitation</DialogTitle>
                    <DialogDescription>
                        Invite member for the collaboration.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit}>
                    <div className="min-h-[300px] grid gap-4">
                        {formik.values.emails.map((e, i) => (
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Enter email address"
                                    type="email"
                                    name={`emails[${i}]`}
                                    onChange={formik.handleChange}
                                    onKeyDown={handleKeyDown}
                                    value={formik.values.emails[i]}
                                />
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
