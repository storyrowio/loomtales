export default function Input(props) {
    const {
        icon,
        validator,
        className,
        ...rest
    } = props;

    return (
        <div>
            <label className={`input validator w-full ${className}`}>
                {icon}
                <input {...rest}/>
            </label>
            <p className="validator-hint hidden">
                {validator}
            </p>
        </div>
    )
}
