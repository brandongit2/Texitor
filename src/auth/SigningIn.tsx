import { Centered } from "components";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "store";

export default function SigningIn() {
    const user = useSelector((state) => state.user);
    const history = useHistory();

    console.log("signing in");
    useEffect(() => {
        if (user.email) history.push("/documents");
    });

    return <Centered>Signing in...</Centered>;
}
