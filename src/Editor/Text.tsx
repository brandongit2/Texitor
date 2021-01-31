import styled from "styled-components";

import React, { useEffect, useMemo, useState, useCallback, FunctionComponent } from 'react'
import { createEditor, Node, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-auto-flow: column;
    column-gap: 4rem;
    align-content: center;
    justify-content: center;
    align-items: center;
`;

const CodeElement: FunctionComponent<{ attributes: any }> = props => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}

const DefaultElement: FunctionComponent<{ attributes: any }> = props => {
    return <p {...props.attributes}>{props.children}</p>
}

export default function Text() {
    const editor = useMemo(() => withReact(createEditor()), [])

    const [value, setValue] = useState<Node[]>([
        {
            type: 'paragraph',
            children: [{ text: 'Start Your Text Here.' }],
        },
    ])

    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={newValue => setValue(newValue)}
        >
            <Editable
                renderElement={renderElement}
                onKeyDown={event => {
                    // Add Key Events
                    if (event.key === '&') {
                        event.preventDefault()
                        editor.insertText('and')
                    }

                    if (event.key === '`' && event.ctrlKey) {
                        console.log(event.key)
                        event.preventDefault()
                        // Determine whether any of the currently selected blocks are code blocks.
                        const match = Editor.nodes(editor, {
                            match: n => n.type === 'code',
                        })
                        // Toggle the block type depending on whether there's already a match.
                        Transforms.setNodes(
                            editor,
                            { type: match ? 'paragraph' : 'code' },
                            { match: n => Editor.isBlock(editor, n) }
                        )
                    }
                }}
            />
        </Slate>
    );
}