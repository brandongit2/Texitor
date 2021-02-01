import { useCallback } from "react";
import { RenderElementProps } from "slate-react";
import styled from "styled-components";

import Section from "./Section";
import { SectionTypes } from "./SectionTypes";

const Title = styled.h1`
    font-weight: 600;
`;

function TitleElement({ attributes, children }: RenderElementProps) {
    return <Title {...attributes}>{children}</Title>;
}

interface PropTypes {
    type: SectionTypes;
    addSection: (type: SectionTypes) => void;
}

export default function TitleSection({ type, addSection }: PropTypes) {
    const renderElement = useCallback(
        (props: RenderElementProps) => <TitleElement {...props} />,
        []
    );

    return (
        <Section
            type={type}
            addSection={addSection}
            renderElement={renderElement}
        />
    );
}
