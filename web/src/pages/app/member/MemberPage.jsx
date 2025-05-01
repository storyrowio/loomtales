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
    const { data: resData } = useSWR(activeWorkspace ? '/api/member' : null,
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

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Sidebar Menus</CardTitle>
                <CardAction>
                    <InviteMemberForm workspaceId={activeWorkspace?.id}/>
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
                        {resData?.length === 0 ? (
                            <TableRow>
                                <TableCell>No Data</TableCell>
                            </TableRow>
                        ) : resData?.map((e, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    {e.user?.name && (
                                        <p className="mb-1 font-semibold">{e.user?.name}</p>
                                    )}
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
                                    {e.status === 'success' ? (
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
                                                    <SelectItem value={item.id} className="rounded-lg">
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Button
                                            className="w-30"
                                            variant="outline"
                                            color="default"
                                            onClick={() => navigate(`${FRONT_SIDEBAR_MENU_PATH}/update/${e.id}`)}>
                                            Resend
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
