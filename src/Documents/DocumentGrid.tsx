import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    overflow: auto;

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

const Grid = styled.div`
    width: 60rem;
    margin: 1rem auto;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 30rem;
    align-items: stretch;
`;

const Doc = styled.a`
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}
`;

const DocImage = styled.div`
    height: 100%;
    width: 100%;
    background: white;
    border: none;
`;

const DocDetails = styled.div`
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: calc(100% - 2rem);
    padding: 1rem;
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 50px 50px rgba(0, 0, 0, 0.2);
`;

interface PropTypes {
    data: { [key: string]: any };
}

export default function DocumentGrid({ data }: PropTypes) {
    return (
        <Container>
            <Grid>
                {data &&
                    (Object.entries(data) as Array<[string, any]>).map(
                        ([id, doc]) => (
                            <Link
                                key={id}
                                to={`/edit?doc=${id}`}
                                component={Doc}
                            >
                                <DocImage />
                                <DocDetails>
                                    <h3
                                        style={{
                                            color: "var(--color-1)",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {doc.title}
                                    </h3>
                                    <p>Date Created: {doc.created}</p>
                                    <p>Last Saved: {doc.lastsave}</p>
                                </DocDetails>
                            </Link>
                        )
                    )}
            </Grid>
        </Container>
    );
}
