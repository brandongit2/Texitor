import { Link } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";

dayjs.extend(relativeTime);

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
        grid-template-columns: min-content 20rem 10rem 10rem;
    }

    @media (max-width: 800px) {
        grid-template-columns: min-content 10rem 10rem 10rem;
    }

    @media (max-width: 650px) {
        display: flex;
        flex-direction: column;
        justify-content: unset;
        align-items: unset;
        padding: 2rem 1rem;
    }
`;

const MobileList = styled.div`
    display: none;

    @media (max-width: 650px) {
        display: grid;
        grid-template-columns: 4rem 85%;
        column-gap: 2rem;
        padding-bottom: 10px;
        border-bottom: 2px solid var(--color-4);
    }
`;

const ListHeader = styled.div`
    display: contents;

    & > * {
        font-weight: 600;
    }

    @media (max-width: 650px) {
        display: none;
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

    @media (max-width: 650px) {
        display: none;
    }
`;

const MobileListImg = styled.div`
    width: 80px;
    height: 80px;
    background: var(--color-4);
`;

const ListDetails = styled.span`
    @media (max-width: 650px) {
        display: none;
    }
`;

interface PropTypes {
    data: { [key: string]: any };
}

export default function DocumentList({ data }: PropTypes) {
    // eslint-disable-next-line
    const [lastUpdated, setLastUpdated] = useState(dayjs());

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
                            <ListDetails>{doc.title}</ListDetails>
                            <ListDetails>12/12/12{doc.created}</ListDetails>
                            <ListDetails>{lastUpdated.fromNow()}</ListDetails>
                            <MobileList>
                                <MobileListImg />
                                <div>
                                    <h3
                                        style={{
                                            fontSize: "26px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {doc.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: "18px",
                                        }}
                                    >
                                        Created on: 12/12/12{doc.created}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: "18px",
                                        }}
                                    >
                                        Last edited: {lastUpdated.fromNow()}
                                    </p>
                                </div>
                            </MobileList>
                        </Link>
                    )
                )}
        </Container>
    );
}
