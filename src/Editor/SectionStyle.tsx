import styled from "styled-components";
import { SectionTypes } from "./SectionTypes";

const Container = styled.div`
    position: relative;
    width: 100%;
`;

const Clip = styled.div`
    position: absolute;
    z-index: 100;
    overflow: hidden;
    width: 100%;
    height: 0px;
    transition: height 0.3s;

    &.open {
        height: 15rem;
    }
`;

const Content = styled.div`
    width: 100%;
    height: 15rem;
    background: var(--color-3);
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface PropTypes {
    isOpen: boolean;
    type: SectionTypes;
}

export default function SectionStyle({ isOpen, type }: PropTypes) {
    return (
        <Container className="section-style">
            <Clip className={isOpen ? "open" : ""}>
                <Content>
                    <span style={{ fontSize: "2rem", color: "var(--color-5)" }}>
                        This is the future style editor.
                    </span>
                </Content>
            </Clip>
        </Container>
    );
}
