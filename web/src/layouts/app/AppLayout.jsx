import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.jsx";
import {AppSidebar} from "@/components/ui/sidebar/app-sidebar.jsx";
import {useCallback, useEffect, useRef, useState} from "react";
import AppNavbarProfile from "@/layouts/app/components/AppNavbarProfile.jsx";
import AppNavbarNotification from "@/layouts/app/components/AppNavbarNotification.jsx";
import {Outlet, useSearchParams} from "react-router";
import {Menubar} from "@/components/ui/menubar.jsx";
import FrontService from "@/services/FrontService.jsx";
import {useDispatch, useSelector} from "@/store/index.jsx";
import {ThemeActions} from "@/store/slices/ThemeSlice.jsx";
import AuthService from "@/services/AuthService.jsx";
import {ProfileActions} from "@/store/slices/ProfileSlice.jsx";
import WorkspaceService from "@/services/WorkspaceService.jsx";
import {AppActions} from "@/store/slices/AppSlice.jsx";
import Loader from "@/assets/images/loader.svg";

export default function AppLayout() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { id } = useSelector(state => state.profile);
    const [isMiniSidebar, setIsMiniSidebar] = useState(false);
    const [loading, setLoading] = useState([]);

    const workspaceId = searchParams.get("workspace");
    const action = searchParams.get("action");

    const fetchProfile = useCallback((query) => {
        return AuthService.GetProfile(query).then(res => {
            dispatch(ProfileActions.setProfile(res?.data));
            return res;
        })
    }, [dispatch]);

    const updateWorkspaceMembers = (workspace) => {
        // workspace.members = [...workspace.members, {userId: id, roleId: }]
    };

    const fetchWorkspaces = useCallback(() => {
        return WorkspaceService.GetWorkspaces({user: id})
            .then(res => {
                dispatch(AppActions.setWorkspaces(res?.data));
                if (res?.data?.length > 0) {
                    dispatch(AppActions.setActiveWorkspace(res?.data[0]));

                    if (searchParams.get('workspace')) {
                        const workspace = res?.data?.find(e => e.id === searchParams.get('workspace'));
                        if (workspace) {
                            dispatch(AppActions.setActiveWorkspace(workspace));
                        }
                    }
                }

                return res;
            })
    }, [dispatch, id, searchParams]);

    const fetchSidebarMenu = useCallback(() => {
        return FrontService.GetUserSidebarMenus()
            .then(res => {
                dispatch(ThemeActions.setSidebarMenus(res))
            });
    }, [dispatch]);

    const fetchInitial = useCallback(async () => {
        const resWorkspace = await WorkspaceService.GetWorkspaces();

        if (resWorkspace?.data?.length > 0) {
            let activeWorkspace = resWorkspace?.data[0];
            if (workspaceId) {
                activeWorkspace = resWorkspace?.data?.find(e => e.id === workspaceId);
            }

            const resProfile = await AuthService.GetProfile({workspace: activeWorkspace?.id});

            if (resProfile?.profile) {
                dispatch(ProfileActions.setProfile(resProfile?.profile));
            }

            if (resProfile?.menus) {
                dispatch(ThemeActions.setSidebarMenus(resProfile?.menus));
            }
        }

        // return fetchWorkspaces().then(() => {
        //
        // });
        // return fetchProfile().then(() => {
        //     return fetchWorkspaces().then(() => {
        //         return fetchSidebarMenu();
        //     });
        // });
    }, [fetchProfile, fetchSidebarMenu, fetchWorkspaces]);

    const mounted = useRef(false);
    useEffect(() => {
        if (!id && !mounted.current) {
            fetchInitial().then(() => {
                mounted.current = true;
            });
        }
    }, [fetchInitial, id, searchParams]);

    useEffect(() => {
        if (action === "invite-confirm") {

        }
    }, [action]);

    if (loading.length < 2) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <img
                    alt="loading"
                    src={Loader}
                    className="w-54 h-54"/>
            </div>
        )
    }

    return (
        <SidebarProvider className="bg-neutral-400">
            <AppSidebar miniSidebar={isMiniSidebar}/>
            <SidebarInset className="bg-neutral-100">
                <header className="flex h-16 bg-white border-b border-border shrink-0 sticky top-0 z-10 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="w-full flex justify-between items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" onClick={() => setIsMiniSidebar(!isMiniSidebar)}/>
                        <Menubar className="border-0 shadow-none">
                            <AppNavbarNotification/>
                            <AppNavbarProfile/>
                        </Menubar>
                    </div>
                </header>
                <div className="p-4 md:p-8">
                    <Outlet/>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
