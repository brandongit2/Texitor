import { useState } from "react";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

import DocumentGrid from "./DocumentGrid";
import DocumentList from "./DocumentList";
import {
    Button,
    ColoredImg,
    ExpandableButton,
    Form,
    Input
} from "../components";
import Loading from "../Loading";
import { useSelector } from "../store";

const Container = styled.div`
    position: absolute;
    height: 100vh;
    top: 0px;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const NewDocumentForm = styled(Form)`
    padding: 1rem;
`;

const DirectoryName = styled.h1`
    font-size: 2em;

    @media (max-width: 600px) {
        font-size: 2rem;
        text-align: center;
    }
`;

const Toolbar = styled.div`
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 2px solid var(--color-4);
    background: var(--color-5);

    @media (max-width: 900px) {
        grid-template-columns: 25% 50% 25%;
    }

    @media (max-width: 600px) {
        grid-template-columns: 25% 50% 25%;
    }
`;

const ToolbarLeft = styled.div`
    display: grid;
    align-items: center;
    grid-auto-flow: column;
    column-gap: 1rem;
`;

const ListTypeButtons = styled.div`
    display: grid;
    grid-auto-flow: column;
    column-gap: 1rem;
`;

export default function Documents() {
    const [newDocumentTitle, setNewDocumentTitle] = useState("");
    const [listType, setListType] = useState("grid");
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
            <Toolbar>
                <ToolbarLeft>
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
                    <DirectoryName>Your documents</DirectoryName>
                </ToolbarLeft>
                <ListTypeButtons>
                    <Button
                        backgroundColor="transparent"
                        padding="10px"
                        onClick={() => {
                            setListType("list");
                        }}
                    >
                        <ColoredImg
                            src="res/list.svg"
                            color="var(--color-1)"
                            width="20px"
                        />
                    </Button>
                    <Button
                        backgroundColor="transparent"
                        padding="10px"
                        onClick={() => {
                            setListType("grid");
                        }}
                    >
                        <ColoredImg
                            src="res/grid.svg"
                            color="var(--color-1)"
                            width="20px"
                        />
                    </Button>
                </ListTypeButtons>
            </Toolbar>
            {listType === "grid" ? (
                <DocumentGrid data={data} />
            ) : (
                <DocumentList data={data} />
            )}
        </Container>
    );
}
