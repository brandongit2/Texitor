import isHotkey from "is-hotkey";
import { Editor } from "slate";
import { ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";

import { AbstractSection } from "./AbstractSection";
import { ActionTypes } from "./ActionTypes";

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

    if (leaf.fontcolor) {
        children = <s>{children}T</s>;
    }

    return <span {...attributes}>{children}</span>;
}

export const ParagraphSection = {
    ...AbstractSection,
    isInitialized: false,
    enabledActions: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "fontsize",
        "fontcolor",
        "fontstyle",
        "leftalign",
        "rightalign",
        "centeralign",
    ] as ActionTypes[],

    init: (editor: Editor & ReactEditor) => {
        const self = ParagraphSection;
        self.editor = editor;

        if (!self.isInitialized) {
            window.addEventListener("bold", () => {
                ReactEditor.focus(self.editor);
                self.embolden();
            });
            window.addEventListener("italic", () => {
                ReactEditor.focus(self.editor);
                self.italicize();
            });
            window.addEventListener("underline", () => {
                ReactEditor.focus(self.editor);
                self.underline();
            });
            window.addEventListener("strikethrough", () => {
                ReactEditor.focus(self.editor);
                self.strikethrough();
            });
            window.addEventListener("fontcolor", () => {
                ReactEditor.focus(self.editor);
                self.fontcolor();
            });
            self.isInitialized = true;
        }

        return self;
    },

    renderElement(props: RenderElementProps) {
        return <ParagraphElement {...props} />;
    },

    renderLeaf(props: RenderLeafProps) {
        return <Leaf {...props} />;
    },

    embolden() {
        this.toggleMark("bold");
    },

    italicize() {
        this.toggleMark("italic");
    },

    underline() {
        this.toggleMark("underline");
    },

    strikethrough() {
        this.toggleMark("strikethrough");
    },

    fontcolor() {
        this.toggleMark("fontcolor");
    },

    onKeyDown: (evt: KeyboardEvent) => {
        const self = ParagraphSection;
        if (isHotkey("mod+b", evt)) {
            self.embolden();
        } else if (isHotkey("mod+i", evt)) {
            self.italicize();
        } else if (isHotkey("mod+u", evt)) {
            self.underline();
        } else if (isHotkey("mod+t", evt)) {
            self.strikethrough();
        }
    },
};
