import { RenderElementProps } from "slate-react";
import styled from "styled-components";

import { AbstractSection } from "./AbstractSection";
import { ActionTypes } from "./ActionTypes";

const H1 = styled.h1`
    font-weight: 800;
`;

export class TitleSection extends AbstractSection {
    enabledActions: ActionTypes[] = ["leftalign", "rightalign", "centeralign"];

    renderElement = (props: RenderElementProps) => {
        return <H1 {...props.attributes}>{props.children}</H1>;
    };
}
