// @refresh reset

import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { createEditor, Editor, Node, Transforms } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import styled from "styled-components";

import { SectionTypes } from "./SectionTypes";
import { useSectionType } from "./useSectionType";
import { Button, ColoredImg, ExpandableButton } from "../components";
import { actions } from "../store";

const SectionHeader = styled.span`
    left: 4rem;
    top: 0px;
    transform: translate(0px, -50%);
    position: absolute;
    z-index: 1;
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
    z-index: 1;
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
    type: SectionTypes;
    addSection: (type: SectionTypes) => void;
}

export default function Section({ type, addSection }: PropTypes) {
    const [isFocused, setIsFocused] = useState({
        textBox: false,
        newSectionList: false,
    });

    let collapseNewSectionList: () => void;

    // Restrict text areas to just one line.
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

    const {
        enabledActions,
        renderElement,
        renderLeaf,
        onKeyDown,
    } = useSectionType(type, editor);

    const dispatch = useDispatch();

    return (
        <Container
            className={
                isFocused.newSectionList || isFocused.textBox ? "focused" : ""
            }
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
                    onKeyDown={onKeyDown as any}
                    onFocus={() => {
                        dispatch(actions.setEnabledActions(enabledActions));
                        setIsFocused((state) => ({ ...state, textBox: true }));
                    }}
                    onBlur={() => {
                        dispatch(actions.setEnabledActions([]));
                        setIsFocused((state) => ({ ...state, textBox: false }));
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
                    onExpand={() => {
                        setIsFocused((state) => ({
                            ...state,
                            newSectionList: true,
                        }));
                    }}
                    onCollapse={() => {
                        setIsFocused((state) => ({
                            ...state,
                            newSectionList: false,
                        }));
                    }}
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
