import { ColoredImg } from "components";
import { useSelector } from "store";
import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    left: 50%;
    bottom: 1rem;
    transform: translate(-50%, 0px);
    background: var(--color-5);
    padding: 0.5rem 1rem;
    border: 2px solid var(--color-4);
    border-radius: 10px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
    display: grid;
    grid-auto-flow: column;
    column-gap: 0.5rem;
`;

const Button = styled.button`
    padding: 4px;

    &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export default function Controls() {
    const enabledActions = useSelector((state) => state.editor.enabledActions);

    return (
        <Container>
            <Button
                className={enabledActions.includes("bold") ? "" : "disabled"}
            >
                <ColoredImg
                    src="res/editor/bold.svg"
                    color="var(--color-1)"
                    width="14px"
                />
            </Button>
            <Button
                className={enabledActions.includes("italic") ? "" : "disabled"}
            >
                <ColoredImg
                    src="res/editor/italic.svg"
                    color="var(--color-1)"
                    width="14px"
                />
            </Button>
            <Button
                className={
                    enabledActions.includes("underline") ? "" : "disabled"
                }
            >
                <ColoredImg
                    src="res/editor/underline-1.svg"
                    color="var(--color-1)"
                    width="14px"
                />
            </Button>
            <Button
                className={
                    enabledActions.includes("strikethrough") ? "" : "disabled"
                }
            >
                <ColoredImg
                    src="res/editor/strikethrough.svg"
                    color="var(--color-1)"
                    width="14px"
                />
            </Button>
        </Container>
    );
}
