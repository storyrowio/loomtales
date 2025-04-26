import useSWR from "swr";
import {useState} from "react";
import {DefaultSort} from "@/constants/constants.jsx";
import FrontService from "@/services/FrontService.jsx";
import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router";

export default function FrontSidebarMenuPage() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState({sort: DefaultSort.name.value})

    const { data: resData } = useSWR(
        [filter, '/api/front/sidebar-menus'],
        () => FrontService.GetSidebarMenus(filter));

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Sidebar Menus</CardTitle>
                <CardDescription>
                    Showing recent transaction and its status
                </CardDescription>
                <CardAction>
                    <Button onClick={() => navigate('/app/front/sidebar-menu/create')}>
                        Add Data
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {resData?.map((e, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell className="text-right">$250.00</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell>No Data</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
