import styled from "styled-components";

import Text from "./TextEditor";

const Container = styled.div`
    background: #fff5ea;
    color: #423629;
    display: flex;
`;

const EditorContainer = styled.div`
    
`;

export default function Editor() {
    return (
        <Container>
            <EditorContainer>
                <Text />
            </EditorContainer>
        </Container>
    );
}