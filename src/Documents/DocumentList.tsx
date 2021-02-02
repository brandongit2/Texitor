import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    column-gap: 2rem;
    row-gap: 1rem;
    grid-template-columns: min-content 30rem 10rem 10rem;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    overflow: auto;

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

const ListHeader = styled.div`
    display: contents;

    & > * {
        font-weight: 600;
    }
`;

const ListDivider = styled.div`
    grid-column: 1 / 5;
    height: 2px;
    background: var(--color-3);
    margin: -1rem 0px;
`;

const Doc = styled.a`
    display: contents;

    & > * {
        cursor: pointer;
    }
`;

const ListImg = styled.div`
    width: 30px;
    height: 30px;
    background: var(--color-4);
`;

interface PropTypes {
    data: { [key: string]: any };
}

export default function DocumentList({ data }: PropTypes) {
    return (
        <Container>
            <ListHeader>
                <span></span>
                <span>Title</span>
                <span>Date created</span>
                <span>Last edited</span>
            </ListHeader>
            <ListDivider />
            {data &&
                (Object.entries(data) as Array<[string, any]>).map(
                    ([id, doc]) => (
                        <Link
                            key={id}
                            to={`/edit?doc=${id}`}
                            component={Doc}
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <ListImg />
                            <span>{doc.title}</span>
                            <span>12/12/12</span>
                            <span>12/12/12</span>
                        </Link>
                    )
                )}
        </Container>
    );
}
