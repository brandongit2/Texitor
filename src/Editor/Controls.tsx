import { useState, Dispatch, SetStateAction, useEffect } from "react";
import styled, { CSSProperties } from "styled-components";

import * as MarkEvents from "./events";
import FontPicker from "./FontPicker";
import { ColoredImg } from "../components";
import { useSelector } from "../store";

const Container = styled.div`
    position: fixed;
    z-index: 100;
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
    align-items: center;
`;

const Button = styled.button`
    padding: 4px;
    cursor: pointer;
    opacity: 1;
    transition: opacity 0.2s;

    &.disabled {
        opacity: 0.2;
        cursor: not-allowed;
    }
`;

const FontSizeContainer = styled.div`
    border: 1px solid var(--color-2);
    border-radius: 8px;
    display: grid;
    grid-auto-flow: column;
    column-gap: 0.2rem;
    padding: 0px 0.2rem;
`;

const FontSizeInput = styled.input`
    background: transparent;
    width: 2rem;
    padding: 0.1rem 0.2em;
    border: 1px solid var(--color-3);
    border-top: none;
    border-bottom: none;
    border-radius: 0px;
    text-align: center;
    transition: opacity 0.2s;
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
    actionVar: any;
    style?: CSSProperties;
}

function ControlButton({
    img,
    event,
    enabled,
    action,
    setAction,
    actionVar,
    style = {},
}: ControlButtonProps) {
    return (
        <Button
            className={`${enabled ? "" : "disabled"} format-button`}
            onClick={() => {
                if (enabled) {
                    if (action === "fontcolor" || action === "fontstyle") {
                        if (actionVar) {
                            setAction(false);
                        } else {
                            setAction(true);
                        }
                    } else {
                        window.dispatchEvent(event);
                    }
                }
            }}
            style={style}
        >
            <ColoredImg src={img} color="var(--color-2)" width="14px" />
        </Button>
    );
}

export default function Controls() {
    const enabledActions = useSelector((state) => state.editor.enabledActions);
    const [font, setFont] = useState("Lato");
    const [fontSize, setFontSize] = useState(12);
    const [action, setAction] = useState("");

    useEffect(() => {
        const fontFamilyEvent = new CustomEvent("fontfamily", { detail: font });
        window.dispatchEvent(fontFamilyEvent);
    }, [font]);

    return (
        <Container>
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
                img="res/editor/underline.svg"
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
                img="res/font.svg"
                event={MarkEvents.strikethroughEvent}
                enabled={enabledActions.includes("fontfamily")}
                action="fontfamily"
                setAction={setAction}
                actionVar={action}
            />
            <div
                className="font-picker"
                style={{
                    transition: "opacity 0.2s",
                    opacity: enabledActions.includes("fontfamily") ? 1 : 0.2,
                }}
            >
                <FontPicker
                    font={font}
                    setFont={setFont}
                    disabled={!enabledActions.includes("fontfamily")}
                />
            </div>
            <Separator />
            <ControlButton
                img="res/editor/capitals.svg"
                event={MarkEvents.fontsizeEvent}
                enabled={enabledActions.includes("fontsize")}
                action="fontsize"
                setAction={setAction}
                actionVar={action}
            />
            <FontSizeContainer
                style={{
                    transition: "opacity 0.2s",
                    opacity: enabledActions.includes("fontsize") ? 1 : 0.2,
                }}
            >
                <Button>
                    <ColoredImg
                        src="res/remove.svg"
                        alt="smaller"
                        color="var(--color-2)"
                        width="12px"
                    />
                </Button>
                <FontSizeInput
                    value={fontSize}
                    onChange={(evt) => {
                        setFontSize(
                            parseInt(evt.target.value.replace(/[^0-9]/g, ""))
                        );
                    }}
                />
                <Button>
                    <ColoredImg
                        src="res/add.svg"
                        alt="larger"
                        color="var(--color-2)"
                        width="12px"
                    />
                </Button>
            </FontSizeContainer>
            <Separator />
            <ControlButton
                img="res/editor/left-align.svg"
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
                img="res/editor/left-align.svg"
                event={MarkEvents.rightalignEvent}
                enabled={enabledActions.includes("rightalign")}
                action="rightalign"
                setAction={setAction}
                actionVar={action}
                style={{ transform: "scaleX(-1)" }}
            />
        </Container>
    );
}
