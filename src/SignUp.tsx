import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth } from "reactfire";
import styled from "styled-components";

import { Button, Input } from "components";
import { actions } from "store";

const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Form = styled.form`
    display: grid;
    grid-template-columns: min-content 1fr;
    align-items: center;
    column-gap: 0.5rem;
    row-gap: 0.5rem;
`;

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = useAuth();
    const dispatch = useDispatch();
    const history = useHistory();
    async function signUp(evt: React.FormEvent) {
        evt.preventDefault();

        try {
            const user = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            dispatch(actions.signIn(user.user?.email));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <Form onSubmit={signUp}>
                <h1 style={{ gridColumn: "1 / 3" }}>Sign up</h1>
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

                <Button style={{ gridColumn: "1 / 3" }}>Sign up</Button>
            </Form>
        </Container>
    );
}
