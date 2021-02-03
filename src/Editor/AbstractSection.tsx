import { Editor } from "slate";
import { ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";

import { ActionTypes } from "./ActionTypes";

export class AbstractSection {
    editor: Editor & ReactEditor;
    enabledActions = [] as ActionTypes[];

    constructor(editor: Editor & ReactEditor) {
        this.editor = editor;
    }

    renderElement = (props: RenderElementProps) => {
        return <p {...props} />;
    };

    renderLeaf = (props: RenderLeafProps) => {
        return <span {...props.attributes}>{props.children}</span>;
    };

    onKeyDown = (evt: KeyboardEvent) => {};

    isMarkActive = (format: ActionTypes) => {
        const marks = Editor.marks(this.editor);
        return marks ? marks[format] === true : false;
    };

    toggleMark = (format: ActionTypes) => {
        const isActive = this.isMarkActive(format);

        if (isActive) {
            Editor.removeMark(this.editor, format);
        } else {
            Editor.addMark(this.editor, format, true);
        }
    };
}
