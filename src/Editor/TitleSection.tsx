import { RenderElementProps } from "slate-react";
import styled from "styled-components";

import { AbstractSection } from "./AbstractSection";

const H1 = styled.h1`
    font-weight: 800;
`;

export class TitleSection extends AbstractSection {
    renderElement = (props: RenderElementProps) => {
        return <H1 {...props.attributes}>{props.children}</H1>;
    };
}
