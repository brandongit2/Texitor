import isHotkey from "is-hotkey";
import { Editor } from "slate";
import { ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";

import { AbstractSection } from "./AbstractSection";

function ParagraphElement({ attributes, children }: RenderElementProps) {
    return <p {...attributes}>{children}</p>;
}

function Leaf({ attributes, children, leaf }: RenderLeafProps) {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    if (leaf.strikethrough) {
        children = <s>{children}</s>;
    }

    return <span {...attributes}>{children}</span>;
}

export class ParagraphSection extends AbstractSection {
    constructor(editor: Editor & ReactEditor) {
        super(editor);

        window.addEventListener("bold", this.embolden);
        window.addEventListener("italic", this.italicize);
        window.addEventListener("underline", this.underline);
        window.addEventListener("strikethrough", this.strikethrough);
    }

    renderElement = (props: RenderElementProps) => {
        return <ParagraphElement {...props} />;
    };

    renderLeaf = (props: RenderLeafProps) => {
        return <Leaf {...props} />;
    };

    embolden = () => {
        this.toggleMark("bold");
    };

    italicize = () => {
        this.toggleMark("italic");
    };

    underline = () => {
        this.toggleMark("underline");
    };

    strikethrough = () => {
        this.toggleMark("strikethrough");
    };

    onKeyDown = (evt: KeyboardEvent) => {
        if (isHotkey("mod+b", evt)) {
            this.embolden();
        } else if (isHotkey("mod+i", evt)) {
            this.italicize();
        } else if (isHotkey("mod+u", evt)) {
            this.underline();
        } else if (isHotkey("mod+t", evt)) {
            this.strikethrough();
        }
    };
}
