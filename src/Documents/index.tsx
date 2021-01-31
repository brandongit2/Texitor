import { useDatabase, useDatabaseObjectData } from "reactfire";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

import { Button, ExpandableButton, Form, Input } from "components";
import Loading from "Loading";
import { useSelector } from "store";
import DocumentList from "./DocumentList";
import { useState } from "react";

const Container = styled.div`
    padding: 1rem;
`;

const NewDocumentForm = styled(Form)`
    padding: 1rem;
`;

const NewDocumentSubmit = styled(Button)`
    border: 1px solid var(--color-5);
    background: var(--color-1);
    color: var(--color-5);
    grid-column: 1 / 3;
`;

export default function Documents() {
    const [newDocumentTitle, setNewDocumentTitle] = useState("");
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

    return (
        <Container>
            <h1>Your documents</h1>
            <DocumentList data={data} />
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
                    <NewDocumentSubmit>Create</NewDocumentSubmit>
                </NewDocumentForm>
            </ExpandableButton>
        </Container>
    );
}
