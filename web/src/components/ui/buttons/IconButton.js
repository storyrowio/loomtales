export default function IconButton(props) {
    const { children, rounded = false, className, ...rest } = props;

    return (
        <div
            className={`size-[36px] bg-white flex items-center justify-center ${rounded ? 'rounded-[50%]' : 'rounded-xl'} border border-border-primary cursor-pointer hover:bg-neutral-50 ${className}`}
            {...rest}
        >
            {children}
        </div>
    )
}
