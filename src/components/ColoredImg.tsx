import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: inline-block;
    position: relative;
`;

const Image = styled.img`
    display: inline-block;
    opacity: 0;
`;

const Inflater = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
`;

interface PropTypes {
    src: string;
    color: string;
    width?: string;
    height?: string;
    alt?: string;
    children?: ReactNode;
    style?: CSSProperties;
    [key: string]: any;
}

export default function ColoredImg({
    src,
    color,
    width = undefined,
    height = undefined,
    alt = src,
    children = null,
    style = {},
    ...props
}: PropTypes) {
    return (
        <Container
            style={{
                background: color,
                mask: `url(/${src}) center/contain no-repeat`,
                WebkitMask: `url(/${src}) center/contain no-repeat`,
                width,
                height,
                ...style,
            }}
            {...props}
        >
            <Image src={src} alt={alt} style={{ width, height }} />
            <Inflater>{children}</Inflater>
        </Container>
    );
}
