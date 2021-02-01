import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import styled from "styled-components";

import { useSelector } from "store";
import Loading from "Loading";
import Page from "./Page";

const Container = styled.div`
    margin: 1rem auto;
    width: calc(100vw - 2rem);
    max-width: 100rem;
`;

const Header = styled.header`
    margin-bottom: 2rem;
`;

const Title = styled.h1`
    font-weight: 600;
`;

export default function Editor() {
    const database = useDatabase();
    const user = useSelector((state) => state.user);
    const location = useLocation();

    const docId = queryString.parse(location.search).doc;
    const dbRef = database.ref(`${user.uid}/${docId}`);
    const { status, data } = useDatabaseObjectData(dbRef) as {
        status: "loading" | "success" | "error";
        data: any;
    };
    if (status === "loading") return <Loading />;
    delete data.NO_ID_FIELD;

    return (
        <Container>
            <Header>
                <Title>{data.title}</Title>
                <p>last edited on ...</p>
            </Header>
            <Page />
        </Container>
    );
}
