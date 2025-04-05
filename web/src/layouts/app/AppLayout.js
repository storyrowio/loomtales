import AppSidebar from "layouts/app/components/AppSidebar";

export default function AppLayout({ children }) {
    return (
        <div>
            <div className="flex">
                <AppSidebar/>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}
