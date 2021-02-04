import React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { ExpandableButton } from "../components";
import { useLoadFonts } from "./useLoadFonts";

const Container = styled.div`
    width: 20rem;
    display: flex;
    flex-direction: column;
    max-height: 18rem;
    overflow: hidden auto;
    padding: 0.5rem;
`;

const Spacer = styled.div`
    flex-shrink: 0;
`;

const FontText = styled.div`
    flex-basis: 30px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    white-space: nowrap;
`;

const loadedFonts = [] as string[];

interface FontProps {
    fontSrc: string;
    fontName: string;
    [key: string]: any;
}

const Font = React.memo(function ({ fontSrc, fontName, ...props }: FontProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (loadedFonts.includes(fontName)) {
            setIsLoading(false);
        } else {
            const font = new FontFace(fontName, `url(${fontSrc})`);
            font.load().then(() => {
                loadedFonts.push(fontName);
                document.fonts.add(font);
                setIsLoading(false);
            });
        }
    }, [fontName, fontSrc]);

    return (
        <FontText {...props} style={{ fontFamily: fontName }}>
            {fontName + (isLoading ? " (loading)" : "")}
        </FontText>
    );
});

interface FontPickerProps {
    font: string;
    setFont: (font: string) => void;
    disabled?: boolean;
}

export default function FontPicker({
    font,
    setFont,
    disabled,
}: FontPickerProps) {
    const [fonts, setFonts] = useState<any[]>([]);

    useEffect(() => {
        async function getFonts() {
            const f = await (
                await fetch(
                    `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
                )
            ).json();
            setFonts(f.items);
        }
        getFonts();
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);
    const spacer1Ref = useRef<HTMLDivElement>(null);
    const spacer2Ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const visibleFonts = useLoadFonts(
        isOpen,
        fonts.length,
        containerRef,
        spacer1Ref,
        spacer2Ref
    );

    let collapse = () => {};

    return (
        <ExpandableButton
            text={font}
            fontFamily={font}
            direction="up"
            padding="0.3rem 0.5rem"
            disabled={disabled}
            onExpand={() => {
                setIsOpen(true);
            }}
            onCollapse={() => {
                setIsOpen(false);
            }}
            collapse={(cb) => {
                collapse = cb;
            }}
        >
            <Container
                ref={containerRef}
                style={{ height: `${30 * fonts.length}px` }}
            >
                <Spacer ref={spacer1Ref} />
                {fonts.slice(...visibleFonts).map((font) => (
                    <Font
                        key={font.family}
                        fontSrc={font.files.regular}
                        fontName={font.family}
                        onClick={() => {
                            setFont(font.family);
                            collapse();
                        }}
                    />
                ))}
                <Spacer ref={spacer2Ref} />
            </Container>
        </ExpandableButton>
    );
}
