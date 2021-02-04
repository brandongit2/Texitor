import { Editor } from "slate";
import { ReactEditor, RenderElementProps } from "slate-react";

import { AbstractSection } from "./AbstractSection";

export const SubtitleSection = {
    ...AbstractSection,
    init: (editor: Editor & ReactEditor) => {
        SubtitleSection.editor = editor;
        return SubtitleSection;
    },

    renderElement(props: RenderElementProps) {
        return <h2 {...props.attributes}>{props.children}</h2>;
    },
};
