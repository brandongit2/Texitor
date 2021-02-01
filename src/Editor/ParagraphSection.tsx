import { useCallback } from "react";
import { RenderElementProps } from "slate-react";

import Section from "./Section";
import { SectionTypes } from "./SectionTypes";

function ParagraphElement({ attributes, children }: RenderElementProps) {
    return <p {...attributes}>{children}</p>;
}

interface PropTypes {
    type: SectionTypes;
    addSection: (type: SectionTypes) => void;
}

export default function ParagraphSection({ type, addSection }: PropTypes) {
    const renderElement = useCallback(
        (props: RenderElementProps) => <ParagraphElement {...props} />,
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
