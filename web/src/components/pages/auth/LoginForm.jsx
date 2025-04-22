import Logo from "components/shared/Logo.jsx";
import Input from "components/ui/form/Input.jsx";
import {Mail02Icon} from "hugeicons-react";
import {useNavigate} from "react-router";

export default function LoginForm() {
    const navigate = useNavigate();

    return (
        <>
            <Logo/>
            <h2 className="text-2xl">Login</h2>
            <span className="text-sm text-neutral-400">Welcome back! Enter your credentials to access your account</span>

            <form>
                <Input
                    placeholder="Your email address"
                    icon={<Mail02Icon/>}/>
            </form>
        </>
    )
}
