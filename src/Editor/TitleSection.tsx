import { RenderElementProps, RenderLeafProps } from "slate-react";
import { AbstractSection } from "./AbstractSection";

export const TitleSection: AbstractSection = {
    renderElement(props: RenderElementProps) {
        return <p {...props} />;
    },
    renderLeaf(props: RenderLeafProps) {
        return <h1 {...props.attributes}>{props.children}</h1>;
    },
};
