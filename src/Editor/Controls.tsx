import styled from "styled-components";

import * as MarkEvents from "./events";
import { ColoredImg, ColorPicker, FontsPicker } from "../components";
import { useSelector } from "../store";
import { useState, Dispatch, SetStateAction } from "react";

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
        opacity: 0.2;
        cursor: not-allowed;
    }
`;

const Separator = styled.div`
    width: 2px;
    height: 100%;
    background: var(--color-4);
`;

interface ControlButtonProps {
    img: string;
    event: CustomEvent;
    enabled: boolean;
    action: string;
    setAction: Dispatch<SetStateAction<any>>;
    actionVar: any
}

function ControlButton({ img, event, enabled, action, setAction, actionVar }: ControlButtonProps) {
    return (
        <Button
            className={`${enabled ? "" : "disabled"} format-button`}
            onClick={() => {
                if (enabled) {
                    if (action === "fontcolor" || action === "fontstyle") {
                        if (actionVar) {
                            setAction(false);
                        }
                        else {
                            setAction(true);
                        }
                    }
                    else {
                        window.dispatchEvent(event);
                    }
                }
            }}
        >
            <ColoredImg src={img} color="var(--color-2)" width="14px" />
        </Button>
    );
}

export default function Controls() {
    const enabledActions = useSelector((state) => state.editor.enabledActions);
    const [color, setColor] = useState("#FFF");
    const [font, setFont] = useState("Open Sans");
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const [colorActive, setColorActive] = useState(false);
    const [fontActive, setFontActive] = useState(false);
    const [action, setAction] = useState("");

    return (
        <Container>
            {fontActive ?
                <FontsPicker activeFontFamily={font} setActiveFont={setFont} apiKey={apiKey} />
                : ""}
            {colorActive ?
                <ColorPicker setColor={setColor} color={color} />
                : ""}
            <ControlButton
                img="res/editor/bold.svg"
                event={MarkEvents.boldEvent}
                enabled={enabledActions.includes("bold")}
                action="bold"
                setAction={setAction}
                actionVar={action}
            />
            <ControlButton
                img="res/editor/italic.svg"
                event={MarkEvents.italicEvent}
                enabled={enabledActions.includes("italic")}
                action="italic"
                setAction={setAction}
                actionVar={action}
            />
            <ControlButton
                img="res/editor/underline-1.svg"
                event={MarkEvents.underlineEvent}
                enabled={enabledActions.includes("underline")}
                action="underline"
                setAction={setAction}
                actionVar={action}
            />
            <ControlButton
                img="res/editor/strikethrough.svg"
                event={MarkEvents.strikethroughEvent}
                enabled={enabledActions.includes("strikethrough")}
                action="strikethrough"
                setAction={setAction}
                actionVar={action}
            />
            <Separator />
            <ControlButton
                img="res/editor/font.svg"
                event={MarkEvents.fontstyleEvent}
                enabled={enabledActions.includes("fontstyle")}
                action="fontstyle"
                setAction={setFontActive}
                actionVar={fontActive}
            />
            <ControlButton
                img="res/editor/font.svg"
                event={MarkEvents.fontsizeEvent}
                enabled={enabledActions.includes("fontsize")}
                action="fontsize"
                setAction={setAction}
                actionVar={action}
            />
            <ControlButton
                img="res/editor/font.svg"
                event={MarkEvents.fontcolorEvent}
                enabled={enabledActions.includes("fontcolor")}
                action="fontcolor"
                setAction={setColorActive}
                actionVar={colorActive}
            />
            <Separator />
            <ControlButton
                img="res/editor/left-indent.svg"
                event={MarkEvents.leftalignEvent}
                enabled={enabledActions.includes("leftalign")}
                action="leftalign"
                setAction={setAction}
                actionVar={action}
            />
            <ControlButton
                img="res/editor/center-alignment.svg"
                event={MarkEvents.centeralignEvent}
                enabled={enabledActions.includes("centeralign")}
                action="centeralign"
                setAction={setAction}
                actionVar={action}
            />
            <ControlButton
                img="res/editor/right-indent.svg"
                event={MarkEvents.rightalignEvent}
                enabled={enabledActions.includes("rightalign")}
                action="rightalign"
                setAction={setAction}
                actionVar={action}
            />
        </Container>
    );
}
