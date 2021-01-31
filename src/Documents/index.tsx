import { useDatabase, useDatabaseObjectData } from "reactfire";
import styled from "styled-components";

import { Button } from "components";
import Loading from "Loading";
import { useSelector } from "store";

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
        const doc = { hello: "Untitled document" };

        ref.update(doc);
    }

    return (
        <Container>
            <h1>Your documents</h1>
            <div>
                {data &&
                    Object.values(data).map((doc: any) => (
                        <span key={doc}>{doc}</span>
                    ))}
            </div>
            <Button onClick={newDocument}>Create a new document</Button>
        </Container>
    );
}
