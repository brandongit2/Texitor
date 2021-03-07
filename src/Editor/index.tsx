import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import queryString from "query-string";
import { Link, useLocation } from "react-router-dom";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";

import Controls from "./Controls";
import Page from "./Page";
import Loading from "../components/Loading";
import { useSelector } from "../store";

dayjs.extend(relativeTime);

const Container = styled.div`
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow: hidden;
    background: var(--color-4);
`;

const HeaderContainer = styled.div`
    position: relative;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    background: var(--color-5);
`;

const Header = styled.header`
    position: relative;
    z-index: 4;
    width: 60rem;
    max-width: calc(100vw - 16rem);
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: 789px) {
        margin: 4rem 2rem;
        margin-bottom: 1rem;
        width: 100%;
        max-width: calc(100vw - 2rem);
    }
`;

const Title = styled.input`
    border: none;
    background: transparent;
    font-size: 2.5em;
    font-weight: 600;
    margin-top: 1rem;
`;

const Main = styled.main`
    overflow: auto;
`;

const PageContainer = styled.div`
    margin: 2rem auto;
    width: 60rem;
    max-width: calc(100vw - 16rem);

    @media (max-width: 789px) {
        width: 100%;
        margin: 2rem auto;
        max-width: calc(100vw - 4rem);
    }
`;

export default function Editor() {
    const database = useDatabase();
    const user = useSelector((state) => state.user);
    const location = useLocation();

    const [title, setTitle] = useReducer(
        (state: string, newTitle: string) => newTitle,
        ""
    );

    const [lastUpdated, setLastUpdated] = useState(dayjs());

    const docId = queryString.parse(location.search).doc;
    const dbRef = database.ref(`${user.uid}/${docId}`);
    const { status, data } = useDatabaseObjectData(dbRef) as {
        status: "error" | "loading" | "success";
        data: { [key: string]: any } | null;
    };

    useEffect(() => {
        if (status !== "success" || data == null) return;
        setTitle(data.title);

        data.lastUpdated && setLastUpdated(dayjs(parseInt(data.lastUpdated)));
    }, [status, data]);

    function updateTitle(newTitle: string) {
        dbRef.update({ title: newTitle });
    }

    if (status === "loading") return <Loading />;
    delete data?.NO_ID_FIELD;

    return (
        <Container>
            <HeaderContainer>
                <Header>
                    <Link to="/documents">← Back to documents</Link>
                    <Title
                        value={title}
                        onChange={(evt) => {
                            setTitle(evt.target.value);
                            updateTitle(evt.target.value);
                        }}
                    />
                    <p>last edited {lastUpdated.fromNow()}</p>
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
