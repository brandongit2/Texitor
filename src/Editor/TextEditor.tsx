import styled from "styled-components";
import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { list } from 'react-icons-kit/feather/list';
import { underline } from 'react-icons-kit/feather/underline';

import React, { useEffect, useMemo, useState, useCallback, FunctionComponent } from 'react'
import { createEditor, Node, Editor, Transforms, Text } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

const Container = styled.div`
    background: #fff5ea;
    color: #423629;
    display: flex;
`;

const Toolbar = styled.div`
    background: #fff5ea;
    color: #423629;
    display: flex;
`;

interface ElementProps {
    attributes: any;
    children: React.ReactNode;
    leaf: any;
}

function CodeElement({ attributes, children }: ElementProps) {
    return (
        <pre {...attributes}>
            <code>{children}</code>
        </pre>
    )
}

function DefaultElement({ attributes, children }: ElementProps) {
    return (
        <pre {...attributes}>
            <p>{children}</p>
        </pre>
    )
}

function Leaf({ attributes, children, leaf }: ElementProps) {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    return (
        <span
            {...attributes}
        >
            {children}
        </span>
    )
}

export default function TextEditor() {
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

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])

    return (
        <Container>
            <Toolbar>
                <button
                    className="tooltip-icon-button"
                >
                    <Icon icon={bold} />
                </button>
                <button
                    className="tooltip-icon-button"
                >
                    <Icon icon={italic} />
                </button>
                <button
                    className="tooltip-icon-button"
                >
                    <Icon icon={underline} />
                </button>
                <button
                    className="tooltip-icon-button"
                >
                    <Icon icon={list} />
                </button>
            </Toolbar>
            <Slate
                editor={editor}
                value={value}
                onChange={newValue => setValue(newValue)}
            >
                <Editable
                    spellCheck
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={event => {
                        // Add Key Events
                        if (event.key === '&') {
                            event.preventDefault()
                            editor.insertText('and')
                        }

                        if (!event.ctrlKey) {
                            return
                        }

                        switch (event.key) {
                            // When "`" is pressed, keep our existing code block logic.
                            case '`': {
                                event.preventDefault()
                                const match = Editor.nodes(editor, {
                                match: n => n.type === 'code',
                                })
                                Transforms.setNodes(
                                    editor,
                                    { type: 'code' },
                                    { match: n => Editor.isBlock(editor, n) }
                                )
                                break
                            }

                            // When "B" is pressed, bold the text in the selection.
                            case 'b': {
                                event.preventDefault()
                                console.log("bold")

                                Transforms.setNodes(
                                    editor,
                                    { bold: true },
                                    // Apply it to text nodes, and split the text node up if the
                                    // selection is overlapping only part of it.
                                    { match: n => Text.isText(n), split: true }
                                )
                                break
                            }
                        }
                    }}
                />
            </Slate>
        </Container>
    );
}