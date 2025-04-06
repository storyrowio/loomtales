export default function AppSidebarSectionTitle(props) {
    const { sectionTitle } = props;

    return (
        <div className="pt-6 pb-3 px-4 mt-6 flex items-center border-t-2 border-neutral-100">
            <span className="uppercase text-[10px] text-neutral-400 tracking-[0.15rem]">{sectionTitle}</span>
        </div>
    )
}