import { Editor } from "slate";
import { ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";

import { ActionTypes } from "./ActionTypes";

export const AbstractSection = {
    editor: (null as any) as Editor & ReactEditor,
    enabledActions: [] as ActionTypes[],

    renderElement: (props: RenderElementProps) => <p {...props} />,

    renderLeaf: (props: RenderLeafProps) => {
        return <span {...props.attributes}>{props.children}</span>;
    },

    onKeyDown: (evt: KeyboardEvent) => {},

    isMarkActive(format: ActionTypes) {
        const marks = Editor.marks(this.editor);
        return marks ? !!marks[format] : false;
    },

    toggleMark(format: ActionTypes) {
        const isActive = this.isMarkActive(format);

        if (isActive) {
            Editor.removeMark(this.editor, format);
        } else {
            Editor.addMark(this.editor, format, true);
        }
    },
};
