import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "reactfire";
import styled from "styled-components";

import { AuthContainer, AuthForm, Button, Input } from "../components";
import Placeholder from "../images/Logo.svg";
import { useSelector } from "../store";

const ImgDiv = styled.div`
    width: 100%;
    height: 100vh;
    background: #e8d0b5;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media (max-width: 600px) {
        height: 50vh;
    }
`;

const SignImg = styled.img`
    height: 350px;
    width: 350px;
`;

const SignImgQuote = styled.p`
    font-size: 20px;
    margin-top: -50px;
    font-weight: bold;
`;

const SignInPrompt = styled.p`
    grid-column: 1 / 3;
    text-align: center;
`;

const ErrPrompt = styled.p`
    text-align: center;
    grid-column: 1 / 3;
    color: var(--color-2);
`;

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const user = useSelector((state) => state.user);
    const history = useHistory();
    const auth = useAuth();

    useEffect(() => {
        if (user.status === "signedin") history.push("/documents");
    });

    async function signUp(evt: React.FormEvent) {
        evt.preventDefault();

        try {
            await auth.createUserWithEmailAndPassword(email, password);
        } catch (err) {
            // TODO: error handling
            setError(err.message);
            console.log(err);
        }
    }

    return (
        <AuthContainer>
            <AuthForm onSubmit={signUp}>
                <h1 style={{ gridColumn: "1 / 3" }}>Sign Up</h1>
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
                <ErrPrompt>{error}</ErrPrompt>
                <Button style={{ gridColumn: "1 / 3" }}>Sign Up</Button>
                <SignInPrompt>
                    Already have an account?{" "}
                    <Link to="/sign-in">Sign In Here</Link>
                </SignInPrompt>
            </AuthForm>
            <ImgDiv>
                <SignImg src={Placeholder} />
                <SignImgQuote>One Key At A Time</SignImgQuote>
            </ImgDiv>
        </AuthContainer>
    );
}
