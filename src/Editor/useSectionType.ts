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
            return TitleSection.init(editor);
        case "subtitle":
            return SubtitleSection.init(editor);
        default:
            return ParagraphSection.init(editor);
    }
}
