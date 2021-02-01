import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

import Section from "./Section";

const Container = styled.div`
    width: 100%;
    background: white;
    color: black;
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.2);
    padding: 4rem 0px;
`;

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [sections, setSections] = useState<{ [uuid: string]: "title" }>({
        [uuid()]: "title",
    });

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.height = `${
                containerRef.current.getBoundingClientRect().width * 1.2941
            }px`;
        }
    });

    return (
        <Container ref={containerRef}>
            {Object.entries(sections).map(([id, type]) => (
                <Section key={id} type={type}></Section>
            ))}
        </Container>
    );
}
