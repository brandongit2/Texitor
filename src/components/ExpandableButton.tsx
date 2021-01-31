import { Button } from "./Button";

interface PropTypes {
    text: string;
    children: React.ReactNode;
}

export function ExpandableButton({ text, children }: PropTypes) {
    return (
        <div>
            <Button>{text}</Button>
            <div>{children}</div>
        </div>
    );
}
