import { useCallback, useEffect, useRef, useState } from "react";
import { createEditor, Editor, Transforms } from "slate";
import { ReactEditor, withReact } from "slate-react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

import Section from "./Section";
import { SectionTypes } from "./SectionTypes";

const Container = styled.div`
    width: 100%;
    background: white;
    color: black;
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.2);
    padding: 4rem 0px;
    display: grid;
    row-gap: 1rem;
    align-content: start;
`;

export default function Page() {
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

    const makeEditor = useCallback(
        () => withSingleLine(withReact(createEditor())),
        []
    );

    const containerRef = useRef<HTMLDivElement>(null);
    const [sections, setSections] = useState<{
        [uuid: string]: { type: SectionTypes; editor: Editor & ReactEditor };
    }>({
        [uuid()]: {
            type: "title",
            editor: makeEditor(),
        },
    });

    function addSection(type: SectionTypes) {
        const editor = makeEditor();
        setSections({
            ...sections,
            [uuid()]: {
                type,
                editor,
            },
        });
    }

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.height = `${
                containerRef.current.getBoundingClientRect().width * 1.2941
            }px`;
        }
    });

    return (
        <Container ref={containerRef}>
            {Object.entries(sections).map(([id, { type, editor }], i) => (
                <div
                    key={id}
                    className={"id-" + id}
                    style={{ zIndex: Object.entries(sections).length - i }}
                >
                    <Section
                        type={type}
                        id={"id-" + id}
                        editor={editor}
                        addSection={addSection}
                    />
                </div>
            ))}
        </Container>
    );
}
