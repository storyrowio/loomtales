import {Breadcrumb} from "@/components/ui/breadcrumb.jsx";
import PageTitle from "@/components/shared/PageTitle.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import * as React from "react";
import {useNavigate} from "react-router";
import {CONTENT_PATH} from "@/constants/paths.jsx";

export default function ContentPage() {
    const navigate = useNavigate();

    return (
        <>
            <PageTitle title="Posts" items={[
                { title: "Home", href: "/app" },
                { title: "Posts" }
            ]}/>
            <Card>
                <CardContent>
                    <div className="flex justify-between gap-4">
                        <Input
                            placeholder="Search here ..."/>
                        <Button onClick={() => navigate(`${CONTENT_PATH}/create`)}>
                            Add Post
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
