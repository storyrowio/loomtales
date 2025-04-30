import {useNavigate} from "react-router";
import {useState} from "react";
import {DefaultSort} from "@/constants/constants.jsx";
import useSWR from "swr";
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {FRONT_SIDEBAR_MENU_PATH} from "@/constants/paths.jsx";
import {EditIcon, TrashIcon} from "lucide-react";
import MemberService from "@/services/MemberService.jsx";

export default function MemberPage() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState({sort: DefaultSort.name.value});

    const { data: resData } = useSWR(
        [filter, '/api/member'],
        () => MemberService.GetMembers(filter));

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Sidebar Menus</CardTitle>
                <CardAction>
                    <Button color="secondary" onClick={() => navigate('/app/front/sidebar-menu/create')}>
                        Add Data
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Path</TableHead>
                            <TableHead>Section Title</TableHead>
                            <TableHead className="max-w-1/4">Permissions</TableHead>
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
                                <TableCell className="font-medium">{e.id}</TableCell>
                                <TableCell>{e.title}</TableCell>
                                <TableCell>{e.path}</TableCell>
                                <TableCell>{e.sectionTitle ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{e.permissions.length} Permissions</TableCell>
                                <TableCell className="flex justify-end gap-2">
                                    <Button
                                        size="icon"
                                        variant="tonal"
                                        color="default"
                                        onClick={() => navigate(`${FRONT_SIDEBAR_MENU_PATH}/update/${e.id}`)}>
                                        <EditIcon/>
                                    </Button>
                                    <Button size="icon" variant="tonal" color="destructive">
                                        <TrashIcon/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
