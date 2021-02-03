import { usePrevious } from "Editor/usePrevious";
import { CSSProperties, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Button from "./Button";

const Container = styled.div`
    position: relative;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: flex-end;
`;

const PanelClipContainer = styled.div`
    display: flex;
    align-items: flex-start;
`;

const RoundBitOccluder = styled.div`
    position: relative;
    transition: border-radius 0.5s;
`;

const PanelClip = styled.div`
    position: absolute;
    overflow: hidden;
    width: 0px;
    height: 0px;
    transition: width 0.5s, height 0.5s, border-radius 0.5s;
`;

const PanelContainer = styled.div`
    width: 100vw;
    height: 100vh;
`;

const Panel = styled.div`
    position: relative;
    width: min-content;
    height: min-content;
`;

interface RoundBitProps {
    type: "inner" | "outer";
    isOpen: boolean;
    pageColor: string;
    backgroundColor: string;
    borderRadius: number;
    style?: CSSProperties;
}

function RoundBit({
    type,
    isOpen,
    pageColor,
    backgroundColor,
    borderRadius,
    style = {},
}: RoundBitProps) {
    const roundBitRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={roundBitRef}
            style={{
                position: type === "inner" ? "absolute" : "relative",
                width: `${borderRadius}px`,
                height: `${borderRadius}px`,
                background: backgroundColor,
                ...style,
            }}
        >
            <RoundBitOccluder
                style={{
                    top: type === "outer" ? "-1px" : "0px",
                    width: `${borderRadius + 1}px`,
                    height: `${borderRadius + 1}px`,
                    background: pageColor,
                    borderRadius: isOpen
                        ? `${type === "inner" ? borderRadius : 0}px 0px 0px ${
                              type === "outer" ? borderRadius : 0
                          }px`
                        : "0px",
                }}
            />
        </div>
    );
}

interface ExpandableButtonProps {
    text: React.ReactNode;
    children: React.ReactNode;
    type?: "inner" | "outer";
    pageColor?: string;
    backgroundColor?: string;
    foregroundColor?: string;
    border?: string;
    borderRadius?: number;
    fontSize?: string;
    fontFamily?: string;
    fontWeight?: string;
    padding?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onExpand?: () => void;
    onCollapse?: () => void;
    collapse?: (cb: () => void) => void;
    [key: string]: any;
}
export default function ExpandableButton({
    text,
    children,
    type = "outer",
    pageColor = "var(--color-5)",
    backgroundColor = "var(--color-1)",
    foregroundColor = "var(--color-5)",
    border = "none",
    borderRadius = 10,
    fontSize = "inherit",
    fontFamily = "inherit",
    fontWeight = "inherit",
    padding = "0.5rem 1rem",
    onExpand = () => {},
    onCollapse = () => {},
    collapse = () => {},
    ...props
}: ExpandableButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const prevIsOpen = usePrevious(isOpen);
    useEffect(() => {
        function handleWindowClick(evt: MouseEvent) {
            if (panelRef.current?.contains(evt.target as Node)) return true;
            setIsOpen(false);
        }

        if (!prevIsOpen && isOpen) {
            onExpand();
            window.addEventListener("click", handleWindowClick);
        } else if (prevIsOpen && !isOpen) {
            onCollapse();
            window.removeEventListener("click", handleWindowClick);
        }
    });

    collapse(() => {
        setIsOpen(false);
    });

    const panelRect = panelRef.current?.getBoundingClientRect() || {
        width: 0,
        height: 0,
    };

    return (
        <Container
            style={{
                marginRight: type === "outer" ? `-${borderRadius}px` : "0px",
            }}
        >
            <ButtonContainer>
                <Button
                    {...props}
                    ref={buttonRef}
                    onClick={(evt) => {
                        if (!isOpen) evt.stopPropagation();
                        setIsOpen(true);
                    }}
                    style={{
                        borderRadius: isOpen
                            ? `${borderRadius}px ${borderRadius}px ${
                                  type === "inner" ? borderRadius : 0
                              }px 0px`
                            : `${borderRadius}px`,
                        transition: "border-radius 0.5s",
                    }}
                    backgroundColor={backgroundColor}
                    foregroundColor={foregroundColor}
                    borderRadius={borderRadius}
                    fontSize={fontSize}
                    fontFamily={fontFamily}
                    fontWeight={fontWeight}
                    padding={padding}
                >
                    {text}
                </Button>
                {type === "outer" ? (
                    <RoundBit
                        {...{
                            type,
                            isOpen,
                            pageColor,
                            backgroundColor,
                            borderRadius,
                        }}
                    />
                ) : null}
            </ButtonContainer>
            <PanelClipContainer>
                <PanelClip
                    style={
                        isOpen
                            ? {
                                  width: `${panelRect.width}px`,
                                  height: `${panelRect.height}px`,
                                  borderRadius: `0px ${
                                      type === "inner" ? 0 : borderRadius
                                  }px ${borderRadius}px ${borderRadius}px`,
                              }
                            : {
                                  width: "0px",
                                  height: "0px",
                                  borderRadius: `${borderRadius}px`,
                              }
                    }
                >
                    <PanelContainer>
                        <Panel
                            ref={panelRef}
                            style={{
                                background: backgroundColor,
                                color: foregroundColor,
                                zIndex: isOpen ? 3 : 0,
                            }}
                        >
                            {children}
                        </Panel>
                    </PanelContainer>
                </PanelClip>
                {type === "inner" ? (
                    <RoundBit
                        {...{
                            type,
                            isOpen: isOpen,
                            pageColor,
                            backgroundColor,
                            borderRadius,
                        }}
                        style={{ left: `${panelRect.width}px` }}
                    />
                ) : null}
            </PanelClipContainer>
        </Container>
    );
}
