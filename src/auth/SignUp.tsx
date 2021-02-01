import { useEffect, useState } from "react";
import { useAuth } from "reactfire";
import styled from "styled-components";

import { Button, Centered, Input, SignDiv, FormDiv } from "../components";
import { useSelector } from "../store";
import { useHistory } from "react-router-dom";
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

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            console.log(err);
        }
    }

    return (
        <SignDiv className="sign-up">
            <FormDiv>
                <Form onSubmit={signUp}>
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

                    <Button style={{ gridColumn: "1 / 3" }}>Sign Up</Button>
                </Form>
            </FormDiv>
            <ImgDiv>
                <SignImg src={Placeholder}/>
            </ImgDiv>
        </SignDiv>
    );
}
