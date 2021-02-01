import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { Button } from "components";
import { useSelector } from "store";

const Container = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: grid;
    grid-auto-flow: column;
    column-gap: 1rem;
    align-items: center;
`;

export default function SignInOutButton() {
    const user = useSelector((state) => state.user);

    const history = useHistory();
    function handleSignOut() {
        history.push("/signing-out?redirect=/");
    }

    return (
        <Container>
            {user.status === "signedin" ? (
                <>
                    <span>
                        Signed in as <b>{user.email}</b>.
                    </span>
                    <Button onClick={handleSignOut}>Sign out</Button>
                </>
            ) : (
                <>
                    <Link to="/sign-in">Sign in</Link>
                    <Button>
                        <Link
                            to="/sign-up"
                            style={{
                                color: "var(--color-5)",
                                textDecoration: "none",
                            }}
                        >
                            Sign up
                        </Link>
                    </Button>
                </>
            )}
        </Container>
    );
}
