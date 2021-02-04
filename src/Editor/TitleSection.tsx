import { Editor } from "slate";
import { ReactEditor, RenderElementProps } from "slate-react";
import styled from "styled-components";

import { AbstractSection } from "./AbstractSection";
import { ActionTypes } from "./ActionTypes";

const H1 = styled.h1`
    font-weight: 800;
`;

export const TitleSection = {
    ...AbstractSection,
    enabledActions: ["leftalign", "rightalign", "centeralign"] as ActionTypes[],

    init: (editor: Editor & ReactEditor) => {
        TitleSection.editor = editor;
        return TitleSection;
    },

    renderElement(props: RenderElementProps) {
        return <H1 {...props.attributes}>{props.children}</H1>;
    },
};
