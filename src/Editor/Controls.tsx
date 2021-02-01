import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    left: 50%;
    bottom: 1rem;
    transform: translate(-50%, 0px);
    background: var(--color-5);
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.3);
`;

export default function Controls() {
    return <Container>Controls</Container>;
}
