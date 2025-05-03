import {useNavigate} from "react-router";
import useSWR from "swr";
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {FRONT_SIDEBAR_MENU_PATH} from "@/constants/paths.jsx";
import MemberService from "@/services/MemberService.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {useSelector} from "@/store/index.jsx";
import InviteMemberForm from "@/components/pages/member/InviteMemberForm.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import * as React from "react";
import RolePermissionService from "@/services/RolePermissionService.jsx";

export default function MemberPage() {
    const navigate = useNavigate();
    const { activeWorkspace } = useSelector(state => state.app);
    const { data: resData, mutate } = useSWR(activeWorkspace ? '/api/member' : null,
        () => MemberService.GetMembers(activeWorkspace?.id));
    const { data: resRoles } = useSWR('/api/roles',
        () => RolePermissionService.GetRoles({}));

    const handleUpdateRole = (userId, roleId) => {
        return MemberService.UpdateMemberRole({
            workspaceId: activeWorkspace?.id,
            userId: userId,
            roleId: roleId
        })
    };

    const handleResend = (invitationId) => {
        if (invitationId !== "") {
            return MemberService.ResendMemberInvitation(invitationId);
        }
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>All Sidebar Menus</CardTitle>
                <CardAction>
                    <InviteMemberForm workspaceId={activeWorkspace?.id} onRefresh={mutate}/>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Member</TableHead>
                            <TableHead></TableHead>
                            <TableHead className="text-right">Option</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {resData?.invitations?.length === 0 && resData?.members?.length === 0 ? (
                            <TableRow>
                                <TableCell>No Data</TableCell>
                            </TableRow>
                        ) : (
                            <>
                                {resData?.invitations?.map((e, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <span className="text-gray-600">{e.email}</span>
                                        </TableCell>
                                        <TableCell>
                                            {e.status === "pending" && (
                                                <Badge variant="tonal" color="warning">
                                                    Pending Confirmation
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="flex justify-end gap-2">
                                            <Button
                                                className="w-30"
                                                variant="outline"
                                                color="default"
                                                onClick={() => handleResend(e.invitationId)}>
                                                Resend
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {resData?.members?.map((e, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            {e.user?.name && (
                                                <p className="mb-1 font-semibold">{e.user?.name}</p>
                                            )}
                                            <span className="text-gray-600">{e.user?.email}</span>
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell className="flex justify-end gap-2">
                                            <Select
                                                value={e.role?.id}
                                                onValueChange={(val) => handleUpdateRole(e.userId, val)}>
                                                <SelectTrigger
                                                    className="w-36"
                                                    aria-label="Select a value">
                                                    <SelectValue placeholder="Select setting type"/>
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl">
                                                    {resRoles?.map((item, j) => (
                                                        <SelectItem key={j} value={item.id} className="rounded-lg">
                                                            {item.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
