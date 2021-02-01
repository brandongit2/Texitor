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

const Title = styled.h1`
    font-weight: 600;
`;

function TitleElement({ attributes, children }: RenderElementProps) {
    return <Title {...attributes}>{children}</Title>;
}

export default function TitleSection() {
    function withSingleLine(editor: Editor & ReactEditor) {
        const { normalizeNode } = editor;

        // https://github.com/ianstormtaylor/slate/issues/419#issuecomment-590135015
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
        <Slate
            editor={editor}
            value={value}
            onChange={(value) => setValue(value)}
        >
            <Editable
                renderElement={renderElement}
                onKeyDown={(event) => {
                    console.log(event.key);
                }}
            />
        </Slate>
    );
}
