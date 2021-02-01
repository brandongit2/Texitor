import queryString from "query-string";
import { useEffect } from "react";
import { useAuth } from "reactfire";
import { useHistory, useLocation } from "react-router-dom";

import { Centered } from "components";
import { useSelector } from "store";

export default function SigningOut() {
    const auth = useAuth();
    const user = useSelector((state) => state.user);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        auth.signOut();
    }, [auth]);

    useEffect(() => {
        const redirect = queryString.parse(location.search).redirect as string;
        if (user.status === "signedout") history.push(redirect || "/");
    });

    return (
        <Centered>
            <p>Signing out...</p>
        </Centered>
    );
}
