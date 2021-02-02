import { useCallback } from "react";
import { Editor, Text, Transforms } from "slate";
import { ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";

import Section from "./Section";
import { SectionTypes } from "./SectionTypes";

function ParagraphElement({ attributes, children }: RenderElementProps) {
    return <p {...attributes}>{children}</p>;
}

function Leaf({ attributes, children, leaf }: RenderLeafProps) {
    return (
        <span
            {...attributes}
            style={{ fontWeight: leaf.bold ? "bold" : "normal" }}
        >
            {children}
        </span>
    );
}

interface PropTypes {
    type: SectionTypes;
    addSection: (type: SectionTypes) => void;
}

export default function ParagraphSection({ type, addSection }: PropTypes) {
    let editor: Editor & ReactEditor;
    const renderElement = useCallback(
        (props: RenderElementProps) => <ParagraphElement {...props} />,
        []
    );

    const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />;
    }, []);

    function handleKeyDown(evt: React.KeyboardEvent<HTMLDivElement>) {
        if (evt.ctrlKey) {
            switch (evt.key) {
                case "b":
                    Transforms.setNodes(
                        editor,
                        { bold: true },
                        { match: (n) => Text.isText(n), split: true }
                    );
                    break;
            }
        }
    }

    return (
        <Section
            type={type}
            addSection={addSection}
            getEditor={(_editor) => (editor = _editor)}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={handleKeyDown}
        />
    );
}
