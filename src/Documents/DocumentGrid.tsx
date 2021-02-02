import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    margin: 1rem;
    display: grid;
    padding: 10px 10%;
    grid-gap: 1rem;
    grid-template-columns: auto auto auto;
    overflow: auto;
    max-height: 75vh;

    @media (max-width: 980px) {
        padding: 10px 5%;
    }

    @media (max-width: 800px) {
        grid-template-columns: auto auto;
        padding: 10px 1rem;
    }

    @media (max-width: 560px) {
        grid-template-columns: auto;
        padding: 10px 5%;
    }
`;

const DocumentTitle = styled.a`
    font-size: 1.3em;
`;

const GridDiv = styled.div`
    background-color: var(--color-4);
    font-size: 30px;
    text-align: center;
    box-shadow: 12px 8px 17px 0px rgba(181, 179, 179, 0.43);
    border-radius: 4px;
}
`;

const GridImg = styled.img`
    width: 100%;
    height: 240px;
    background: var(--color-3);
    border: none;
    border-radius: 4px 4px 0px 0px;
`;

const GridDetails = styled.div`
    font-size: 18px;
    padding: 0px 10px 10px 15px;
    text-align: left;
`;


interface PropTypes {
    data: { [key: string]: any }
}

export default function DocumentGrid({ data }: PropTypes) {
    return (
        <Container>
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
                            <GridDiv>
                                <GridImg />
                                <GridDetails>
                                    <h3 style={{
                                        color: "var(--color-1)",
                                        fontWeight: "bold"
                                    }}
                                    >{doc.title}</h3>
                                    <p>Date Created:</p>
                                    <p>Last Saved:</p>
                                </GridDetails>
                            </GridDiv>
                        </Link>
                    )
                )}
        </Container>
    );
} 