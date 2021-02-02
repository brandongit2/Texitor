import queryString from "query-string";
import { Link, useLocation } from "react-router-dom";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import styled from "styled-components";

import Controls from "./Controls";
import Page from "./Page";
import Loading from "../Loading";
import { useSelector } from "../store";

const Container = styled.div`
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow: hidden;
`;

const HeaderContainer = styled.div`
    position: relative;
    border-bottom: 2px solid var(--color-4);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
    position: relative;
    z-index: 4;
    width: 60rem;
    max-width: calc(100vw - 10rem);
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Title = styled.h1`
    font-weight: 600;
    margin-top: 1rem;
`;

const Main = styled.main`
    overflow: auto;
`;

const PageContainer = styled.div`
    margin: 2rem auto;
    width: 60rem;
    max-width: calc(100vw - 10rem);
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
            <HeaderContainer>
                <Header>
                    <Link to="/documents">← Back to documents</Link>
                    <Title>{data.title}</Title>
                    <p>last edited on ...</p>
                </Header>
            </HeaderContainer>
            <Main>
                <PageContainer>
                    <Page />
                    <Controls />
                </PageContainer>
            </Main>
        </Container>
    );
}
