import { Editor } from "slate";
import { ReactEditor } from "slate-react";

import { ParagraphSection } from "./ParagraphSection";
import { SectionTypes } from "./SectionTypes";
import { SubtitleSection } from "./SubtitleSection";
import { TitleSection } from "./TitleSection";

export function useSectionType(
    type: SectionTypes,
    editor: Editor & ReactEditor
) {
    switch (type) {
        case "title":
            return new TitleSection(editor);
        case "subtitle":
            return new SubtitleSection(editor);
        default:
            return new ParagraphSection(editor);
    }
}
