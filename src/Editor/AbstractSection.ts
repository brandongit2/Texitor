import { RenderElementProps, RenderLeafProps } from "slate-react";

export interface AbstractSection {
    renderElement(props: RenderElementProps): JSX.Element;
    renderLeaf(props: RenderLeafProps): JSX.Element;
}
