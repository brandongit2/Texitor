import styled from "styled-components";

import { Button } from "../components";
import Placeholder from "../Images/Placeholder.png";

const Container = styled.div`
    width: 80%;
    margin: auto;
    max-width: 80%;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10% 0px 10%;
    column-gap: 1.2em;
    grid-template-columns: 40% 60%;

    @media(max-width: 760px) {
        grid-auto-flow: row;
        margin-top: 20px;
    }
`;

const LeftSide = styled.div`
    display: grid;
    row-gap: 2rem;
    justify-items: left;
    padding-left: 20px;

    @media(max-width: 760px) {
        justify-items: center;
        padding-left: 0px;
        margin-top: 20px;
    }
`;

const Title = styled.h1`
    font-family: "AnonymousPro", monospace;
    width: 3.8em;
    border-right: 3px solid transparent;
    font-size: 5em;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    transform: translateY(0%);  
    animation: typewriter 2s steps(7) 1s 1 normal both,
    blinkTextCursor 700ms steps(7) infinite normal;

    @media(max-width: 540px) {
        font-size: 4em;
    }

`;

const Tagline = styled.h2`
    font-size: 2rem;

    @media(max-width: 760px) {
        text-align: center;
    }
`;

const CallToActionButton = styled(Button)`
    font-size: 1.5rem;
`;

const ImgDiv = styled.div`
    width: 500px;
    height: 500px;
    background: var(--color-4);
    border-top-left-radius: 170px;
    border: none;
    overflow: hidden;
    border-bottom-right-radius: 170px;

    @media(max-width: 980px) {
        width: 350px;
        height: 350px;
    }

    @media(max-width: 760px) {
        grid-row: 1;
        width: 400px;
        height: 400px;
        margin: 0 auto;
    }

    @media(max-width: 420px) {
        width: 350px;
        height: 350px;
    }
`;

export default function Hero() {
    return (
        <Container>
            <LeftSide>
                <div>
                    <Title>Texitor</Title>
                    <Tagline>
                        The modern, simple text editor of your dreams.
                    </Tagline>
                </div>
                <CallToActionButton>Get started</CallToActionButton>
            </LeftSide>
            <ImgDiv>
                <img src={Placeholder}
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                />
            </ImgDiv>
        </Container>
    );
}
