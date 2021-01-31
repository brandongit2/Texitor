import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth } from "reactfire";
import styled from "styled-components";

import { Button, Centered, Input } from "./components";
import { actions, useSelector } from "./store";

const Form = styled.form`
    display: grid;
    grid-template-columns: min-content 1fr;
    align-items: center;
    column-gap: 0.5rem;
    row-gap: 0.5rem;
`;

export default function SignIn() {
    const user = useSelector((state) => state.user);
    const history = useHistory();

    useEffect(() => {
        if (user.email) history.push("/documents");
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = useAuth();
    const dispatch = useDispatch();
    async function signIn(evt: React.FormEvent) {
        evt.preventDefault();

        try {
            const user = await auth.signInWithEmailAndPassword(email, password);
            dispatch(actions.signIn(user.user?.email));
            history.push("/documents");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Centered>
            <Form onSubmit={signIn}>
                <h1 style={{ gridColumn: "1 / 3" }}>Sign in</h1>
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

                <Button style={{ gridColumn: "1 / 3" }}>Sign in</Button>
            </Form>
        </Centered>
    );
}
