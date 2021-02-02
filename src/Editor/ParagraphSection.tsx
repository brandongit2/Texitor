import { RenderElementProps, RenderLeafProps } from "slate-react";
import { AbstractSection } from "./AbstractSection";

function ParagraphElement({ attributes, children }: RenderElementProps) {
    return <p {...attributes}>{children}</p>;
}

function Leaf({ attributes, children, leaf }: RenderLeafProps) {
    return (
        <span
            {...attributes}
            style={{ fontWeight: leaf.bold ? "bold" : "normal" }}
        >
            {children}
        </span>
    );
}

export const ParagraphSection: AbstractSection = {
    renderElement(props: RenderElementProps) {
        return <ParagraphElement {...props} />;
    },

    renderLeaf(props) {
        return <Leaf {...props} />;
    },
};
