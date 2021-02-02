import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    margin: 1rem;
    display: grid;
    padding: 10px 10%;
    grid-gap: 1rem;
    grid-template-columns: auto;
    overflow: auto;
    max-height: 75vh;

    @media (max-width: 980px) {
        padding: 10px 5%;
    }

    @media (max-width: 800px) {
        padding: 10px 1rem;
    }

    @media (max-width: 560px) {
        padding: 10px 5%;
    }
`;

const ListHeaderDiv = styled.div`
    display: grid;
    grid-template-columns: 10% 30% 30% 30%;
`;

const ListHeader = styled.h2`
    font-weight: bold;
    padding-left: 20px;
`;

const DocumentTitle = styled.a`
    font-size: 1.3em;
`;

const ListImg = styled.img`
    width: 50px;
    height: 50px;
    background: var(--color-3);
`;

const ListTitle = styled.p`
    padding-left: 20px;
`;

const ListCreate = styled.p`
    padding-left: 20px;
`;

const ListSave = styled.p`
    padding-left: 20px;
`;

const ListDiv = styled.div`
    display: grid;
    grid-template-columns: 10% 30% 30% 30%;
    align-items: center;
`;


interface PropTypes {
    data: { [key: string]: any }
}

export default function DocumentList({ data }: PropTypes) {
    return (
        <Container>
            <ListHeaderDiv>
                <ListHeader></ListHeader>
                <ListHeader>Title</ListHeader>
                <ListHeader>Date Created</ListHeader>
                <ListHeader>Last Saved</ListHeader>
            </ListHeaderDiv>
            {data &&
                (Object.entries(data) as Array<[string, any]>).map(
                    ([id, doc]) => (
                        <Link
                            key={id}
                            to={`/edit?doc=${id}`}
                            component={DocumentTitle}
                            style={{
                                textDecoration: "none"
                            }}
                        >
                            <ListDiv>
                                <ListImg />
                                <ListTitle>{doc.title}</ListTitle>
                                <ListCreate>12/12/12</ListCreate>
                                <ListSave>12/12/12</ListSave>
                            </ListDiv>
                        </Link>
                    )
                )}
        </Container>
    );
} 