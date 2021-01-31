import styled from "styled-components";

import Text from "./Editor";

const Container = styled.div`
    background: #fff5ea;
    color: #423629;
    display: flex;
`;

export default function Editor() {
    return (
        <Container>
            <Text />
        </Container>
    );
}