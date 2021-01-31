import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { useSelector } from "store";
import Hero from "./Hero";

const Container = styled.div`
    display: flex;
`;

export default function Homepage() {
    const user = useSelector((state) => state.user);
    if (user.email) {
        return <Redirect to="/documents" />;
    }

    return (
        <Container>
            <Hero />
        </Container>
    );
}
