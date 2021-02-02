import { useDatabase, useDatabaseObjectData } from "reactfire";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

import { Button, ExpandableButton, Form, Input } from "../components";
import Loading from "../Loading";
import { useSelector } from "../store";
import DocumentList from "./DocumentList";
import DocumentGrid from "./DocumentGrid";
import { useState } from "react";
import { Icon } from 'react-icons-kit';
import { list } from 'react-icons-kit/iconic/list';
import { threeUp } from 'react-icons-kit/iconic/threeUp';

const Container = styled.div`
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

const NewDocumentForm = styled(Form)`
    padding: 1rem;
`;

const DocTitle = styled.h1`
    @media (max-width: 600px) {
        font-size: 2rem;
        text-align: center;
    }
`;

const DocToolbar = styled.div`
    display: grid;
    grid-template-columns: 16% 34% 50%;
    align-items: center;
    padding: 1rem;
    padding-top: 4rem;
    border-bottom: 2px solid var(--color-4);
    background: var(--color-5);


    @media (max-width: 900px) {
        grid-template-columns: 25% 50% 25%;
    }

    @media (max-width: 600px) {
        grid-template-columns: 25% 50% 25%;
    }
`;

const DocButtons = styled.div`
   text-align: right;
`;

export default function Documents() {
    const [newDocumentTitle, setNewDocumentTitle] = useState("");
    const [listtype, setListtype] = useState("grid");
    const user = useSelector((state) => state.user);
    const database = useDatabase();

    const ref = database.ref(user.uid as string);
    const { data } = useDatabaseObjectData(ref) as { data: any };

    if (!data) return <Loading />;
    delete data.NO_ID_FIELD;

    function newDocument(title: string) {
        const doc = {
            [uuid()]: { title },
        };
        ref.update(doc);
    }

    function handleGrid() {
        setListtype("grid");
    }

    function handleList() {
        setListtype("list");
    }

    return (
        <Container>
            <DocToolbar>
                <ExpandableButton text="Create a new document">
                    <NewDocumentForm
                        onSubmit={(evt) => {
                            evt.preventDefault();
                            newDocument(newDocumentTitle);
                        }}
                    >
                        <label>Title:</label>
                        <Input
                            value={newDocumentTitle}
                            onChange={(evt) => {
                                setNewDocumentTitle(evt.target.value);
                            }}
                        />
                        <Button
                            border="1px solid var(--color-5)"
                            backgroundColor="var(--color-1)"
                            foregroundColor="var(--color-5)"
                            style={{ gridColumn: "1 / 3" }}
                        >
                            Create
                    </Button>
                    </NewDocumentForm>
                </ExpandableButton>
                <DocTitle>Your documents</DocTitle>
                <DocButtons>
                    <Button
                        backgroundColor="none"
                        style={{ color: 'var(--color-1)' }}
                        onClick={handleList}>
                        <Icon icon={list} size={29} />
                    </Button>
                    <Button
                        backgroundColor="none"
                        style={{ color: 'var(--color-1)' }}
                        onClick={handleGrid}>
                        <Icon icon={threeUp} size={25} />
                    </Button>
                </DocButtons>
            </DocToolbar>
            {listtype === "grid" ? <DocumentGrid data={data} /> : <DocumentList data={data} />}
        </Container>
    );
}
