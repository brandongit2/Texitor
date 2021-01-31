import styled from "styled-components";

import { Button } from "components";

const Container = styled.div`
    margin: auto;
    width: 100%;
    max-width: 80%;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LeftSide = styled.div`
    display: grid;
    row-gap: 2rem;
    justify-items: left;
`;

const Title = styled.h1`
    font-size: 3rem;
    font-weight: 800;
`;

const Tagline = styled.h2`
    font-size: 1.5rem;
`;

const CallToActionButton = styled(Button)`
    font-size: 1.5rem;
`;

export default function Hero() {
    return (
        <Container>
            <LeftSide>
                <div>
                    <Title>Welcome to Texitor!</Title>
                    <Tagline>
                        The modern, simple text editor of your dreams.
                    </Tagline>
                </div>
                <CallToActionButton>Get started</CallToActionButton>
            </LeftSide>

            {/* The image placeholder. */}
            <div
                style={{
                    width: "600px",
                    height: "500px",
                    background: "var(--color-4)",
                }}
            />
        </Container>
    );
}
