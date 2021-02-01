// @refresh reset

import { useCallback, useMemo, useState } from "react";
import { createEditor, Editor, Node, Transforms } from "slate";
import {
    Editable,
    ReactEditor,
    RenderElementProps,
    Slate,
    withReact,
} from "slate-react";
import styled from "styled-components";

import { Button, ColoredImg } from "components";

const SectionHeader = styled.span`
    left: 5rem;
    top: 0px;
    transform: translate(0px, -50%);
    position: absolute;
    font-family: Interstate;
    font-weight: 700;
    font-size: 10px;
    background: white;
    padding: 5px;
    color: var(--color-3);
    opacity: 0;
    transition: opacity 0.2s;
`;

const SectionFooter = styled.div`
    position: absolute;
    right: 5rem;
    bottom: 0px;
    transform: translate(0px, 50%);
    font-size: 10px;
    opacity: 0;
    transition: opacity 0.2s;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    column-gap: 10px;
`;

const PlainButton = styled.div`
    padding: 5px;
    background: white;
    display: flex;
`;

const NewSectionButton = styled(Button)`
    font-family: Interstate;
    font-weight: 700;
    background: var(--color-4);
    color: var(--color-3);
    padding: 3px 6px;
    border-radius: 5px;
`;

const Container = styled.div`
    position: relative;
    border: 2px solid white;
    border-left: none;
    border-right: none;
    transition: border 0.2s;
    padding: 1rem 4rem;

    &:hover,
    &.focused {
        border: 2px solid var(--color-4);
        border-left: none;
        border-right: none;
    }

    &:hover
        ${SectionHeader},
        &.focused
        ${SectionHeader},
        &:hover
        ${SectionFooter},
        &.focused
        ${SectionFooter} {
        opacity: 1;
    }
`;

const Title = styled.h1`
    font-weight: 600;
`;

function TitleElement({ attributes, children }: RenderElementProps) {
    return <Title {...attributes}>{children}</Title>;
}

interface PropTypes {
    type: string;
}

export default function Section({ type }: PropTypes) {
    const [isFocused, setIsFocused] = useState(false);

    // https://github.com/ianstormtaylor/slate/issues/419#issuecomment-590135015
    function withSingleLine(editor: Editor & ReactEditor) {
        const { normalizeNode } = editor;

        editor.normalizeNode = ([node, path]) => {
            if (path.length === 0) {
                if (editor.children.length > 1) {
                    Transforms.mergeNodes(editor);
                }
            }
            return normalizeNode([node, path]);
        };
        return editor;
    }

    const editor = useMemo(() => withSingleLine(withReact(createEditor())), []);
    const [value, setValue] = useState<Node[]>([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ]);

    const renderElement = useCallback(
        (props: RenderElementProps) => <TitleElement {...props} />,
        []
    );

    return (
        <Container className={isFocused ? "focused" : ""}>
            <SectionHeader>{type.toUpperCase()}</SectionHeader>
            <Slate
                editor={editor}
                value={value}
                onChange={(value) => setValue(value)}
            >
                <Editable
                    renderElement={renderElement}
                    onFocus={() => {
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                />
            </Slate>
            <SectionFooter>
                <NewSectionButton>+ ADD SECTION BELOW</NewSectionButton>
                <PlainButton>
                    <ColoredImg
                        src="down-chevron.svg"
                        color="var(--color-3)"
                        alt="up"
                        height="10px"
                        style={{ transform: "rotate(180deg)" }}
                    />
                </PlainButton>
                <PlainButton>
                    <ColoredImg
                        src="down-chevron.svg"
                        color="var(--color-3)"
                        alt="down"
                        height="10px"
                    />
                </PlainButton>
            </SectionFooter>
        </Container>
    );
}
