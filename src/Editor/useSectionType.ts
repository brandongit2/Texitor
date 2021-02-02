import { AbstractSection } from "./AbstractSection";
import { ParagraphSection } from "./ParagraphSection";
import { SectionTypes } from "./SectionTypes";
import { SubtitleSection } from "./SubtitleSection";
import { TitleSection } from "./TitleSection";

export function useSectionType(type: SectionTypes) {
    let Section: AbstractSection;
    switch (type) {
        case "title":
            Section = TitleSection;
            break;
        case "subtitle":
            Section = SubtitleSection;
            break;
        default:
            Section = ParagraphSection;
    }
    const { renderElement, renderLeaf } = Section;

    return { renderElement, renderLeaf };
}
