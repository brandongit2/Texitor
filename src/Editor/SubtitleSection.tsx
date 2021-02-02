import { RenderElementProps } from "slate-react";

import { AbstractSection } from "./AbstractSection";

export class SubtitleSection extends AbstractSection {
    renderElement = (props: RenderElementProps) => {
        return <h2 {...props.attributes}>{props.children}</h2>;
    };
}
