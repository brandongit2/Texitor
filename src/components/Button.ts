import styled from "styled-components";

interface PropTypes {
    backgroundColor?: string;
    foregroundColor?: string;
    border?: string;
    borderRadius?: number;
    fontSize?: string;
    fontFamily?: string;
    fontWeight?: string;
    padding?: string;
}

export default styled.button<PropTypes>`
    background: ${(props) => props.backgroundColor || "var(--color-1)"};
    color: ${(props) => props.foregroundColor || "var(--color-5)"};
    border: ${(props) => props.border || "none"};
    border-radius: ${(props) =>
        props.borderRadius ? `${props.borderRadius}px` : "10px"};
    font-size: ${(props) => props.fontSize || "inherit"};
    font-family: ${(props) => props.fontFamily || "inherit"};
    font-weight: ${(props) => props.fontWeight || "inherit"};
    padding: ${(props) => props.padding || "0.5rem 1rem"};
    cursor: pointer;
`;
