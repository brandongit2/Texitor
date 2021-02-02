import { RenderElementProps, RenderLeafProps } from "slate-react";

import { AbstractSection } from "./AbstractSection";

export const SubtitleSection: AbstractSection = {
    renderElement(props: RenderElementProps) {
        return <p {...props} />;
    },
    renderLeaf(props: RenderLeafProps) {
        return <h2 {...props.attributes}>{props.children}</h2>;
    },
};
