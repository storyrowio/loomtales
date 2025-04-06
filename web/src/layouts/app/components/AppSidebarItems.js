import AppSidebarSectionTitle from "layouts/app/components/AppSidebarSectionTitle";
import AppSidebarItem from "layouts/app/components/AppSidebatItem";

export default function AppSidebarItems(props) {
    const { items, parent } = props;

    return items?.map((e, i) => {
        if (e.sectionTitle) {
            return <AppSidebarSectionTitle key={i} sectionTitle={e.sectionTitle}/>
        } else if (e.children) {
            // return <AppSidebarGroup key={i} item={e}/>
        } else {
            return <AppSidebarItem key={i} item={e} parent={parent}/>
        }
    });
}