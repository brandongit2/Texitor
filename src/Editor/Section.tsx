// @refresh reset

import { useMemo, useState } from "react";
import { createEditor, Editor, Node, Transforms } from "slate";
import {
    Editable,
    ReactEditor,
    RenderElementProps,
    RenderLeafProps,
    Slate,
    withReact,
} from "slate-react";
import styled from "styled-components";

import { Button, ColoredImg, ExpandableButton } from "../components";
import { SectionTypes } from "./SectionTypes";

const SectionHeader = styled.span`
    left: 4rem;
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
    right: 4rem;
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

const Container = styled.div`
    position: relative;
    border: 2px solid transparent;
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

const NewSectionList = styled.ul`
    list-style-type: none;
    margin: 0px;
    padding: 5px 8px;
    display: grid;
    row-gap: 5px;
`;

const NewSectionEntry = styled.li`
    font-family: Interstate;
    font-weight: 700;
    font-size: 12px;
    cursor: pointer;
`;

interface PropTypes {
    type: string;
    addSection: (type: SectionTypes) => void;
    getEditor?: (editor: Editor & ReactEditor) => void;
    renderElement?: (props: RenderElementProps) => JSX.Element;
    renderLeaf?: (props: RenderLeafProps) => JSX.Element;
    onKeyDown?: (evt: React.KeyboardEvent<HTMLDivElement>) => void;
}

export default function Section({
    type,
    addSection,
    getEditor = undefined,
    renderElement = undefined,
    renderLeaf = undefined,
    onKeyDown = undefined,
}: PropTypes) {
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
    getEditor && getEditor(editor);
    const [value, setValue] = useState<Node[]>([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ]);

    let collapseNewSectionList = () => {};

    return (
        <Container
            className={isFocused ? "focused" : ""}
            onMouseLeave={() => {
                collapseNewSectionList();
            }}
        >
            <SectionHeader>{type.toUpperCase()}</SectionHeader>
            <Slate
                editor={editor}
                value={value}
                onChange={(value) => setValue(value)}
            >
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={onKeyDown}
                    onFocus={() => {
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                />
            </Slate>
            <SectionFooter>
                <ExpandableButton
                    text="+ ADD SECTION BELOW"
                    type="inner"
                    pageColor="white"
                    backgroundColor="var(--color-4)"
                    foregroundColor="var(--color-3)"
                    borderRadius={5}
                    fontFamily="Interstate"
                    fontWeight="700"
                    padding="3px 6px"
                    collapse={(cb) => {
                        collapseNewSectionList = cb;
                    }}
                >
                    <NewSectionList>
                        <NewSectionEntry
                            onClick={() => {
                                addSection("paragraph");
                                collapseNewSectionList();
                            }}
                        >
                            Paragraph
                        </NewSectionEntry>
                        <NewSectionEntry
                            onClick={() => {
                                addSection("title");
                                collapseNewSectionList();
                            }}
                        >
                            Title
                        </NewSectionEntry>
                        <NewSectionEntry
                            onClick={() => {
                                addSection("subtitle");
                                collapseNewSectionList();
                            }}
                        >
                            Subtitle
                        </NewSectionEntry>
                        <NewSectionEntry
                            onClick={() => {
                                addSection("image");
                                collapseNewSectionList();
                            }}
                        >
                            Image
                        </NewSectionEntry>
                        <NewSectionEntry
                            onClick={() => {
                                addSection("table");
                                collapseNewSectionList();
                            }}
                        >
                            Table
                        </NewSectionEntry>
                    </NewSectionList>
                </ExpandableButton>
                <Button
                    backgroundColor="var(--color-4)"
                    borderRadius={5}
                    padding="5px"
                    style={{ display: "flex" }}
                >
                    <ColoredImg
                        src="res/down-chevron.svg"
                        color="var(--color-3)"
                        alt="up"
                        height="8px"
                        style={{ transform: "rotate(180deg)" }}
                    />
                </Button>
                <Button
                    backgroundColor="var(--color-4)"
                    borderRadius={5}
                    padding="5px"
                    style={{ display: "flex" }}
                >
                    <ColoredImg
                        src="res/down-chevron.svg"
                        color="var(--color-3)"
                        alt="down"
                        height="8px"
                    />
                </Button>
            </SectionFooter>
        </Container>
    );
}
