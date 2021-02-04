import isHotkey from "is-hotkey";
import { Editor } from "slate";
import { ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";

import { AbstractSection } from "./AbstractSection";
import { ActionTypes } from "./ActionTypes";

export const ParagraphSection = {
    ...AbstractSection,
    isInitialized: false,
    enabledActions: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "fontfamily",
        "fontcolor",
        "leftalign",
        "rightalign",
        "centeralign",
    ] as ActionTypes[],

    fontFamily: "unset",

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
            window.addEventListener("fontfamily", (({
                detail,
            }: CustomEvent) => {
                ReactEditor.focus(self.editor);
                ParagraphSection.fontFamily = detail;
            }) as EventListener);
            window.addEventListener("fontcolor", () => {
                ReactEditor.focus(self.editor);
                self.fontcolor();
            });
            self.isInitialized = true;
        }

        return self;
    },

    renderElement({ attributes, children }: RenderElementProps) {
        return (
            <p
                {...attributes}
                style={{ fontFamily: ParagraphSection.fontFamily as string }}
            >
                {children}
            </p>
        );
    },

    renderLeaf({ attributes, children, leaf }: RenderLeafProps) {
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

        return (
            <span {...attributes} style={{ fontFamily: "inherit" }}>
                {children}
            </span>
        );
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
