import {useSelector} from "@/store/index.jsx";
import {useEffect, useRef, useState} from "react";
import Loader from "@/assets/images/loader.svg";
import {useNavigate, useParams} from "react-router";
import MemberService from "@/services/MemberService.jsx";

export default function MemberInviteConfirmPage() {
    const { token } = useParams();
    const navigate = useNavigate();
    const { id } = useSelector(state => state.profile);
    const [loading, setLoading] = useState(true);

    const confirmInvitation = async () => {
        return MemberService.ConfirmMemberInvitation({
            token: token
        }).then((res) => {
            console.log(res)
            navigate(res?.data?.callbackUrl);
        });
    };

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current && token) {
            confirmInvitation();
        }
    }, [token]);

    if (loading) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <img
                    alt="loading"
                    src={Loader}
                    className="w-24 h-24"/>
            </div>
        )
    }

    // return (
    //
    // )
}
