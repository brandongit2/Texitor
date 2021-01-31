import styled from "styled-components";

import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { createEditor, Node } from 'slate'
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

export default function Editor() {
    const editor = useMemo(() => withReact(createEditor()), [])

    const [value, setValue] = useState<Node[]>([
        {
            type: 'paragraph',
            children: [{ text: 'Start Your Text Here.' }],
        },
    ])

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={newValue => setValue(newValue)}
        >
            <Editable
                onKeyDown={event => {
                    // Add Key Events
                    if (event.key === '&') {
                        event.preventDefault()
                        editor.insertText('and')
                    }
                }}
            />
        </Slate>
    );
}