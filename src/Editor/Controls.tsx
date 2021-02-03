import styled from "styled-components";

import * as MarkEvents from "./events";
import { ColoredImg } from "../components";
import { useSelector } from "../store";

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
    cursor: pointer;

    &.disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }
`;

export default function Controls() {
    const enabledActions = useSelector((state) => state.editor.enabledActions);

    return (
        <Container>
            <Button
                className={enabledActions.includes("bold") ? "" : "disabled"}
                onClick={() => {
                    window.dispatchEvent(MarkEvents.boldEvent);
                }}
            >
                <ColoredImg
                    src="res/editor/bold.svg"
                    color="var(--color-1)"
                    width="14px"
                />
            </Button>
            <Button
                className={enabledActions.includes("italic") ? "" : "disabled"}
                onClick={() => {
                    window.dispatchEvent(MarkEvents.italicEvent);
                }}
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
                onClick={() => {
                    window.dispatchEvent(MarkEvents.underlineEvent);
                }}
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
                onClick={() => {
                    window.dispatchEvent(MarkEvents.strikethroughEvent);
                }}
            >
                <ColoredImg
                    src="res/editor/strikethrough.svg"
                    color="var(--color-1)"
                    width="14px"
                />
            </Button>
            <Button
                className={
                    enabledActions.includes("fontstyle") ? "" : "disabled"
                }
                onClick={() => {
                    window.dispatchEvent(MarkEvents.fontstyleEvent);
                }}
            >
                <ColoredImg
                    src="res/editor/font.svg"
                    color="var(--color-1)"
                    width="14px"
                />
            </Button>
            <Button
                className={
                    enabledActions.includes("fontsize") ? "" : "disabled"
                }
                onClick={() => {
                    window.dispatchEvent(MarkEvents.fontsizeEvent);
                }}
            >
                <ColoredImg
                    src="res/editor/font.svg"
                    color="var(--color-1)"
                    width="14px"
                />
            </Button>
            <Button
                className={
                    enabledActions.includes("fontcolor") ? "" : "disabled"
                }
                onClick={() => {
                    window.dispatchEvent(MarkEvents.fontcolorEvent);
                }}
            >
                <ColoredImg
                    src="res/editor/font.svg"
                    color="var(--color-1)"
                    width="14px"
                />
            </Button>
            <Button
                className={
                    enabledActions.includes("leftalign") ? "" : "disabled"
                }
                onClick={() => {
                    window.dispatchEvent(MarkEvents.leftalignEvent);
                }}
            >
                <ColoredImg
                    src="res/editor/left-indent.svg"
                    color="var(--color-1)"
                    width="14px"
                />
            </Button>
            <Button
                className={
                    enabledActions.includes("centeralign") ? "" : "disabled"
                }
                onClick={() => {
                    window.dispatchEvent(MarkEvents.centeralignEvent);
                }}
            >
                <ColoredImg
                    src="res/editor/center-alignment.svg"
                    color="var(--color-1)"
                    width="14px"
                />
            </Button>
            <Button
                className={
                    enabledActions.includes("rightalign") ? "" : "disabled"
                }
                onClick={() => {
                    window.dispatchEvent(MarkEvents.rightalignEvent);
                }}
            >
                <ColoredImg
                    src="res/editor/right-indent.svg"
                    color="var(--color-1)"
                    width="14px"
                />
            </Button>
        </Container>
    );
}
