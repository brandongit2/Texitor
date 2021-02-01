import { useCallback } from "react";
import { RenderElementProps } from "slate-react";
import styled from "styled-components";

import Section from "./Section";
import { SectionTypes } from "./SectionTypes";

const Subtitle = styled.h2`
    font-weight: 600;
`;

function SubtitleElement({ attributes, children }: RenderElementProps) {
    return <Subtitle {...attributes}>{children}</Subtitle>;
}

interface PropTypes {
    type: SectionTypes;
    addSection: (type: SectionTypes) => void;
}

export default function SubtitleSection({ type, addSection }: PropTypes) {
    const renderElement = useCallback(
        (props: RenderElementProps) => <SubtitleElement {...props} />,
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
