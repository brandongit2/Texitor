import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100px;
    display: grid;
    grid-auto-flow: column;
    column-gap: 4rem;
    align-content: center;
    justify-content: center;
    align-items: center;
`;

const Copyright = styled.p`
    width: 100%;
`;

export default function Footer() {
    return (
        <Container>
            <Copyright>Copyright © 2021 Texitor.</Copyright>
        </Container>
    );
}