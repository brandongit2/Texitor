import { useAuth } from "reactfire";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { Button } from "components";
import { useSelector } from "store";

const Container = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
`;

export default function SignInOutButton() {
    const user = useSelector((state) => state.user);

    const auth = useAuth();
    const history = useHistory();
    function handleSignOut() {
        auth.signOut();
        setTimeout(() => {
            history.push("/");
        }, 500);
    }

    return (
        <Container>
            {user.email ? (
                <Button onClick={handleSignOut}>Sign out</Button>
            ) : (
                <Button>
                    <Link
                        to="/sign-in"
                        style={{
                            color: "var(--color-5)",
                            textDecoration: "none",
                        }}
                    >
                        Sign in
                    </Link>
                </Button>
            )}
        </Container>
    );
}
