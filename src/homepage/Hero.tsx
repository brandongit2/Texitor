import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-auto-flow: column;
    column-gap: 4rem;
    align-content: center;
    justify-content: center;
    align-items: center;
`;

const LeftSide = styled.div`
    width: 40rem;
    display: grid;
    row-gap: 1.5rem;
    justify-items: left;
`;

const Title = styled.h1`
    font-size: 4rem;
    font-weight: 800;
    margin: -0.2em 0px;
`;

const Tagline = styled.h2`
    font-size: 2rem;
`;

const CallToActionButton = styled.button`
    background: var(--color-4);
    color: var(--color-1);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
`;

export default function Hero() {
    return (
        <Container>
            <LeftSide>
                <Title>Texitor</Title>
                <Tagline>
                    The modern, simple text editor of your dreams.
                </Tagline>
                <CallToActionButton>Start a new document</CallToActionButton>
            </LeftSide>

            {/* The image placeholder. */}
            <div
                style={{
                    width: "600px",
                    height: "500px",
                    background: "var(--color-2)",
                }}
            />
        </Container>
    );
}
