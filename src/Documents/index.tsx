import { useDatabase, useDatabaseObjectData } from "reactfire";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

import { Button } from "components";
import Loading from "Loading";
import { useSelector } from "store";
import DocumentList from "./DocumentList";

const Container = styled.div`
    padding: 1rem;
`;

export default function Documents() {
    const user = useSelector((state) => state.user);
    const database = useDatabase();

    const ref = database.ref(user.uid as string);
    const { data } = useDatabaseObjectData(ref) as { data: any };

    if (!data) return <Loading />;
    delete data.NO_ID_FIELD;

    function newDocument() {
        const doc = {
            [uuid()]: { title: "Untitled document" },
        };
        ref.update(doc);
    }

    return (
        <Container>
            <h1>Your documents</h1>
            <DocumentList data={data} />
            <Button onClick={newDocument}>Create a new document</Button>
        </Container>
    );
}
