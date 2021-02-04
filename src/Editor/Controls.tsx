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

interface ControlButtonProps {
    img: string;
    event: CustomEvent;
    enabled: boolean;
}

function ControlButton({ img, event, enabled }: ControlButtonProps) {
    return (
        <Button
            className={enabled ? "" : "disabled"}
            onClick={(evt) => {
                window.dispatchEvent(event);
            }}
        >
            <ColoredImg src={img} color="var(--color-2)" width="14px" />
        </Button>
    );
}

export default function Controls() {
    const enabledActions = useSelector((state) => state.editor.enabledActions);

    return (
        <Container>
            <ControlButton
                img="res/editor/bold.svg"
                event={MarkEvents.boldEvent}
                enabled={enabledActions.includes("bold")}
            />
            <ControlButton
                img="res/editor/italic.svg"
                event={MarkEvents.italicEvent}
                enabled={enabledActions.includes("italic")}
            />
            <ControlButton
                img="res/editor/underline-1.svg"
                event={MarkEvents.underlineEvent}
                enabled={enabledActions.includes("underline")}
            />
            <ControlButton
                img="res/editor/strikethrough.svg"
                event={MarkEvents.strikethroughEvent}
                enabled={enabledActions.includes("strikethrough")}
            />
            <ControlButton
                img="res/editor/font.svg"
                event={MarkEvents.fontstyleEvent}
                enabled={enabledActions.includes("fontstyle")}
            />
            <ControlButton
                img="res/editor/font.svg"
                event={MarkEvents.fontsizeEvent}
                enabled={enabledActions.includes("fontsize")}
            />
            <ControlButton
                img="res/editor/font.svg"
                event={MarkEvents.fontcolorEvent}
                enabled={enabledActions.includes("fontcolor")}
            />
            <ControlButton
                img="res/editor/left-indent.svg"
                event={MarkEvents.leftalignEvent}
                enabled={enabledActions.includes("leftalign")}
            />
            <ControlButton
                img="res/editor/center-alignment.svg"
                event={MarkEvents.centeralignEvent}
                enabled={enabledActions.includes("centeralign")}
            />
            <ControlButton
                img="res/editor/right-indent.svg"
                event={MarkEvents.rightalignEvent}
                enabled={enabledActions.includes("rightalign")}
            />
        </Container>
    );
}
