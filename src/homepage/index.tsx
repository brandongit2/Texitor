import styled from "styled-components";

import Hero from "./Hero";

const Container = styled.div`
    background: #fff5ea;
    color: #423629;
    display: flex;
`;

export default function Homepage() {
    return (
        <Container>
            <Hero />
        </Container>
    );
}
