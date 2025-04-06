export default function AppSidebarItem(props) {
    const { item } = props;
    const Icon = item.icon;
    const active = false;

    return (
        <div className={`px-4 py-2 rounded-lg ${active ? 'bg-primary-500' : 'bg-transparent'} cursor-pointer`}>
            <div className="flex items-center">
                {item?.icon && (
                    <div className="w-[30px] h-[24px] flex items-center">
                        <Icon size={20} strokeWidth={2} className={`${active ? 'text-white' : 'text-neutral-500'}`}/>
                    </div>
                )}
                <p className={`text-sm ${active ? 'text-white' : 'text-neutral-500'}`}>{item.title}</p>
            </div>
        </div>
    )
}