import {useNavigate} from "react-router";

export default function LoginPage() {
    const navigate = useNavigate();

    return (
        <div>
            Login
            <button
                className="btn btn-primary"
                onClick={() => navigate('/register')}>
                Register
            </button>
        </div>
    )
}
