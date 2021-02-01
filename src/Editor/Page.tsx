import { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    background: white;
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.2);
`;

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.height = `${
                containerRef.current.getBoundingClientRect().width * 1.2941
            }px`;
        }
    });

    return <Container ref={containerRef}></Container>;
}
