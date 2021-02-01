import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

import Section from "./Section";
import { SectionTypes } from "./SectionTypes";
import TitleSection from "./TitleSection";

const Container = styled.div`
    width: 100%;
    background: white;
    color: black;
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.2);
    padding: 4rem 0px;
    display: grid;
    row-gap: 1rem;
    align-content: start;
`;

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [sections, setSections] = useState<{ [uuid: string]: SectionTypes }>({
        [uuid()]: "title",
    });

    function addSection(type: SectionTypes) {
        setSections({ ...sections, [uuid()]: type });
    }

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.height = `${
                containerRef.current.getBoundingClientRect().width * 1.2941
            }px`;
        }
    });

    return (
        <Container ref={containerRef}>
            {Object.entries(sections).map(([id, type]) => {
                switch (type) {
                    case "title":
                        return (
                            <TitleSection
                                key={id}
                                type={type}
                                addSection={addSection}
                            />
                        );
                    default:
                        return (
                            <Section
                                key={id}
                                type={type}
                                addSection={addSection}
                            />
                        );
                }
            })}
        </Container>
    );
}
