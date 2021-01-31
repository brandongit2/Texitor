import { useEffect, useState } from "react";
import { useAuth } from "reactfire";
import styled from "styled-components";

import { Button, Centered, Input } from "components";
import { useSelector } from "store";
import { useHistory } from "react-router-dom";

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

    const user = useSelector((state) => state.user);
    const history = useHistory();
    const auth = useAuth();

    useEffect(() => {
        if (user.email) history.push("/documents");
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
        <Centered>
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
        </Centered>
    );
}
