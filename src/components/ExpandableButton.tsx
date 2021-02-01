import { useLayoutEffect, useReducer, useRef } from "react";
import styled from "styled-components";

import Button from "./Button";

const Container = styled.div`
    position: relative;
`;

const RoundBit = styled.div`
    position: absolute;
    width: 8px;
    height: 8px;
    background: var(--color-1);
`;

const RoundBitOccluder = styled.div`
    position: relative;
    top: -8px;
    width: 16px;
    height: 16px;
    background: var(--color-5);
    transition: border-radius 0.5s;
`;

const PanelClip = styled.div`
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
    background: var(--color-1);
    color: var(--color-5);
`;

interface PropTypes {
    text: string;
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    [key: string]: any;
}
export default function ExpandableButton({
    text,
    children,
    ...props
}: PropTypes) {
    const [isCollapsed, toggleIsCollapsed] = useReducer(
        (state) => !state,
        true
    );
    const buttonRef = useRef<HTMLButtonElement>(null);
    const roundBitRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const buttonRect = buttonRef.current?.getBoundingClientRect() || {
        width: 0,
        height: 0,
    };
    const panelRect = panelRef.current?.getBoundingClientRect() || {
        width: 0,
        height: 0,
    };

    useLayoutEffect(() => {
        if (roundBitRef.current && buttonRef.current) {
            roundBitRef.current.style.left = `${buttonRect.width}px`;
            roundBitRef.current.style.top = `${buttonRect.height - 8}px`;
        }
    });

    return (
        <Container>
            <Button
                {...props}
                ref={buttonRef}
                onClick={(evt) => {
                    toggleIsCollapsed();
                }}
                style={{
                    borderRadius: isCollapsed ? "8px" : "8px 8px 0px 0px",
                    transition: "border-radius 0.5s",
                }}
            >
                {text}
            </Button>
            <RoundBit ref={roundBitRef}>
                <RoundBitOccluder
                    style={{
                        borderRadius: isCollapsed ? "0px" : "0px 0px 0px 8px",
                    }}
                />
            </RoundBit>
            <PanelClip
                style={
                    isCollapsed
                        ? {
                              width: "0px",
                              height: "0px",
                              borderRadius: "8px",
                          }
                        : {
                              width: `${panelRect.width}px`,
                              height: `${panelRect.height}px`,
                              borderRadius: "0px 8px 8px 8px",
                          }
                }
            >
                <PanelContainer>
                    <Panel ref={panelRef}>{children}</Panel>
                </PanelContainer>
            </PanelClip>
        </Container>
    );
}
