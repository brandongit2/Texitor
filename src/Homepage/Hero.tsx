import styled from "styled-components";

import { Button } from "../components";
import Placeholder from "../images/Placeholder.png";

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

    @media (max-width: 760px) {
        grid-auto-flow: row;
        margin-top: 20px;
    }
`;

const LeftSide = styled.div`
    display: grid;
    row-gap: 2rem;
    justify-items: left;
    padding-left: 20px;

    @media (max-width: 760px) {
        justify-items: center;
        padding-left: 0px;
        margin-top: 20px;
    }
`;

const Title = styled.h1`
    position: relative;
    display: inline-block;
    margin-bottom: -0.3em;
    font-size: 5em;

    &::after {
        content: "";
        display: block;
        position: absolute;
        top: 10%;
        right: -10px;
        height: 80%;
        width: 3px;
        background: var(--color-1);
        animation: blink 1s infinite;
    }

    @media (max-width: 540px) {
        font-size: 4em;
    }

    @keyframes blink {
        0% {
            background: var(--color-1);
        }

        25% {
            background: transparent;
        }

        75% {
            background: transparent;
        }

        100% {
            background: var(--color-1);
        }
    }
`;

const Tagline = styled.h2`
    font-size: 2rem;

    @media (max-width: 760px) {
        text-align: center;
    }
`;

const ImgDiv = styled.div`
    width: 500px;
    height: 500px;
    background: var(--color-4);
    border-top-left-radius: 170px;
    border: none;
    overflow: hidden;
    border-bottom-right-radius: 170px;

    @media (max-width: 980px) {
        width: 350px;
        height: 350px;
    }

    @media (max-width: 760px) {
        grid-row: 1;
        width: 400px;
        height: 400px;
        margin: 0 auto;
    }

    @media (max-width: 420px) {
        width: 350px;
        height: 350px;
    }
`;

export default function Hero() {
    return (
        <Container>
            <LeftSide>
                <Title>Texitor</Title>
                <Tagline>
                    The modern, simple text editor of your dreams.
                </Tagline>
                <Button fontSize="1.5em">Get started</Button>
            </LeftSide>
            <ImgDiv>
                <img
                    src={Placeholder}
                    alt=""
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            </ImgDiv>
        </Container>
    );
}
