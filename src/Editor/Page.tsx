import Loading from "components/Loading";
import queryString from "query-string";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { useSelector } from "store";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

import Section from "./Section";
import { SectionTypes } from "./SectionTypes";

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
    const database = useDatabase();
    const user = useSelector((state) => state.user);
    const location = useLocation();

    const containerRef = useRef<HTMLDivElement>(null);
    type Section = {
        id: string;
        type: SectionTypes;
    };
    const [sections, _setSections] = useState<Section[]>([
        {
            id: uuid(),
            type: "title",
        },
    ]);
    const [loading, setLoading] = useState(true);

    const docId = queryString.parse(location.search).doc;
    const docRef = database.ref(`${user.uid}/${docId}/sectionList`);
    const setSections = useCallback(
        (newSections: Section[]) => {
            database.ref(`${user.uid}/${docId}`).update({
                sectionList: Object.fromEntries(
                    newSections.map((section, i) => [
                        i,
                        JSON.stringify(section),
                    ])
                ),
            });
        },
        [database, docId, user.uid]
    );

    const { status, data } = useDatabaseObjectData(docRef) as {
        status: "error" | "loading" | "success";
        data: { [key: string]: any } | null;
    };
    useEffect(() => {
        if (status === "success" && data) {
            delete data.NO_ID_FIELD;

            if (Object.entries(data).length === 0) {
                setSections([{ id: uuid(), type: "title" }]);
            } else {
                const dbSections = (Object.entries(data) as Array<
                    [string, string]
                >)
                    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                    .map((datum) => datum[1]);
                _setSections(
                    dbSections.map((dbSection) => JSON.parse(dbSection))
                );
            }

            setLoading(false);
        }
    }, [status, _setSections, setSections, data]);

    const [focusedSection, setFocusedSection] = useState(sections.length - 1);

    function addSection(type: SectionTypes, after: number) {
        let _sections = [...sections];
        _sections.splice(after + 1, 0, { id: uuid(), type });
        setSections(_sections);
        setFocusedSection(after + 1);
    }

    function moveUp(id: string) {
        const i = sections.findIndex(({ id: _id }) => _id === id);
        const _sections = [...sections];

        if (i < 1) return;

        _sections[i - 1] = _sections.splice(i, 1, _sections[i - 1])[0];
        setSections(_sections);
    }

    function moveDown(id: string) {
        const i = sections.findIndex(({ id: _id }) => _id === id);
        const _sections = [...sections];

        if (i > sections.length - 2) return;

        _sections[i + 1] = _sections.splice(i, 1, _sections[i + 1])[0];
        setSections(_sections);
    }

    function remove(id: string) {
        const i = sections.findIndex(({ id: _id }) => _id === id);
        const _sections = [...sections];

        _sections.splice(i, 1);
        setSections(_sections);
    }

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.height = `${
                containerRef.current.getBoundingClientRect().width * 1.2941
            }px`;
        }
    });

    if (loading) return <Loading />;
    return (
        <Container ref={containerRef}>
            {sections.map(({ id, type }, i) => (
                <div
                    key={id}
                    className={"id-" + id}
                    style={{ zIndex: sections.length - i }}
                >
                    <Section
                        type={type}
                        id={id}
                        focused={focusedSection === i}
                        setFocused={() => {
                            setFocusedSection(i);
                        }}
                        setUnfocused={() => {
                            setFocusedSection(-1);
                        }}
                        addSection={(type: SectionTypes) => {
                            addSection(type, i);
                        }}
                        moveUp={moveUp}
                        moveDown={moveDown}
                        remove={remove}
                    />
                </div>
            ))}
        </Container>
    );
}
