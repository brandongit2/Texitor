import { Editor } from "slate";
import { ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";

type Marks = "bold" | "italic" | "underline" | "strikethrough" | "fontsize" | "fontcolor" | "fontstyle" | "leftalign" | "rightalign" | "centeralign";

export class AbstractSection {
    editor: Editor & ReactEditor;

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

    isMarkActive = (format: Marks) => {
        const marks = Editor.marks(this.editor);
        return marks ? marks[format] === true : false;
    };

    toggleMark = (format: Marks) => {
        const isActive = this.isMarkActive(format);

        if (isActive) {
            Editor.removeMark(this.editor, format);
        } else {
            Editor.addMark(this.editor, format, true);
        }
    };
}
