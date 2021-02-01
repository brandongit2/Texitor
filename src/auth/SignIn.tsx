import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "reactfire";
import styled from "styled-components";

import { AuthContainer, AuthForm, Button, Input } from "../components";
import Placeholder from "../images/Placeholder.png";
import { useSelector } from "../store";

const ImgDiv = styled.div`
    width: 100%;
    height: 100vh;
    background: var(--color-4);
    overflow: hidden;

    @media (max-width: 560px) {
        order: 1;
        height: 400px;
    }
`;

const SignImg = styled.img`
    height: 100%;
    width: 100%;

    @media (max-width: 560px) {
        height: auto;
        margin-top: -60px;
    }
`;

const SignUpPrompt = styled.p`
    grid-column: 1 / 3;
    text-align: center;
`;

export default function SignIn() {
    const user = useSelector((state) => state.user);
    const history = useHistory();

    useEffect(() => {
        if (user.status === "signedin") history.push("/documents");
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = useAuth();
    async function signIn(evt: React.FormEvent) {
        evt.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            history.push("/signing-in");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AuthContainer>
            <AuthForm onSubmit={signIn}>
                <h1 style={{ gridColumn: "1 / 3" }}>Sign In</h1>
                <label htmlFor="email">Email:</label>
                <Input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                />

                <Button
                    style={{
                        gridColumn: "1 / 3",
                        textDecoration: "none",
                    }}
                >
                    Sign in
                </Button>
                <SignUpPrompt>
                    Don't have an account?{" "}
                    <Link to="/sign-up">Sign Up Here</Link>
                </SignUpPrompt>
            </AuthForm>
            <ImgDiv>
                <SignImg src={Placeholder} />
            </ImgDiv>
        </AuthContainer>
    );
}
