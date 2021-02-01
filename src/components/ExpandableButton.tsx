import { CSSProperties, useRef, useState } from "react";
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
    width: min-content;
    height: min-content;
`;

interface RoundBitProps {
    type: "inner" | "outer";
    isCollapsed: boolean;
    pageColor: string;
    backgroundColor: string;
    borderRadius: number;
    style?: CSSProperties;
}

function RoundBit({
    type,
    isCollapsed,
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
                    borderRadius: isCollapsed
                        ? "0px"
                        : `${type === "inner" ? borderRadius : 0}px 0px 0px ${
                              type === "outer" ? borderRadius : 0
                          }px`,
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
    collapse = (cb) => {},
    ...props
}: ExpandableButtonProps) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    function toggleIsCollapsed() {
        setIsCollapsed((state) => !state);
    }

    collapse(() => {
        setIsCollapsed(true);
    });

    const panelRect = panelRef.current?.getBoundingClientRect() || {
        width: 0,
        height: 0,
    };

    return (
        <Container>
            <ButtonContainer>
                <Button
                    {...props}
                    ref={buttonRef}
                    onClick={() => {
                        toggleIsCollapsed();
                    }}
                    style={{
                        borderRadius: isCollapsed
                            ? `${borderRadius}px`
                            : `${borderRadius}px ${borderRadius}px ${
                                  type === "inner" ? borderRadius : 0
                              }px 0px`,
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
                            isCollapsed,
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
                        isCollapsed
                            ? {
                                  width: "0px",
                                  height: "0px",
                                  borderRadius: `${borderRadius}px`,
                              }
                            : {
                                  width: `${panelRect.width}px`,
                                  height: `${panelRect.height}px`,
                                  borderRadius: `0px ${
                                      type === "inner" ? 0 : borderRadius
                                  }px ${borderRadius}px ${borderRadius}px`,
                              }
                    }
                >
                    <PanelContainer>
                        <Panel
                            ref={panelRef}
                            style={{
                                background: backgroundColor,
                                color: foregroundColor,
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
                            isCollapsed,
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
