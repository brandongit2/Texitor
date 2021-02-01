import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "reactfire";
import styled from "styled-components";

import { Button, Input, SignDiv, FormDiv } from "../components";
import { useSelector } from "../store";
import Placeholder from "../Images/Placeholder.png";

const Form = styled.form`
    display: grid;
    grid-template-columns: min-content 1fr;
    align-items: center;
    column-gap: 0.5rem;
    row-gap: 0.5rem;

    @media(max-width: 560px) {
        margin-top: -100px;
    }
`;

const ImgDiv = styled.div`
    width: 100%;
    height: 100vh;
    background: var(--color-4);
    overflow: hidden;

    @media(max-width: 560px) {
        order: 1;
        height: 400px;
    }
`;

const SignImg = styled.img`
    height: 100%;
    width: 100%;

    @media(max-width: 560px) {
        height: auto;
        margin-top: -60px;
    }
`;

export default function SignIn() {
    console.log("NOOO");
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
        <SignDiv className="sign-in">
            <FormDiv>
                <Form onSubmit={signIn}>
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

                    <Button style={{
                        gridColumn: "1 / 3",
                        textDecoration: "none"
                    }}>Sign in</Button>

                </Form>
            </FormDiv>
            <ImgDiv>
                <SignImg src={Placeholder}/>
            </ImgDiv>
        </SignDiv>
    );
}
