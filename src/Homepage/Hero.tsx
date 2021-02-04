// @refresh reset

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Button } from "../components";
import Gif from "../images/Texitor.gif";

const Container = styled.div`
    width: 80%;
    margin: auto;
    height: 100vh;
    display: grid;
    align-items: center;
    column-gap: 2rem;
    grid-template-columns: 2.5fr 2fr;

    @media (max-width: 789px) {
        display: flex;
        flex-direction: column;
        height: auto;
        padding: 5rem 0rem;
    }

    @media (max-width: 550px) {
        width: 85%;
    }
`;

const LeftSide = styled.div`
    display: grid;
    row-gap: 2rem;
    justify-items: left;
    padding-left: 20px;

    @media (max-width: 789px) {
        padding-left: 0px;
        padding-top: 20px;
    }
`;

const Title = styled.h1`
    display: inline-block;
    margin-bottom: -0.3em;
    font-size: 5em;

    @media (max-width: 789px) {
        font-size: 4.5em;
    }
`;

const Tagline = styled.h2`
    display: inline-block;
    font-size: 2rem;

    @media (max-width: 760px) {
    }
`;

const AnimatedCaret = styled.div`
    display: inline-block;
    position: relative;
    top: 0.1em;
    height: 1em;
    width: 2px;
    background: var(--color-1);

    &.blink {
        animation: blink 1s infinite;
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

const Image = styled.img`
    width: 100%;
    box-shadow: 0px 0px 20px 0px #8a8a8a47;
    border-radius: 7px;
    border: 1px solid var(--color-5);

    @media (max-width: 789px) {
        margin-top: 50px;
    }
`;

export default function Hero() {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [isTitleAnimationFinished, setIsTitleAnimationFinished] = useState(
        false
    );
    const [
        isSubtitleAnimationFinished,
        setIsSubtitleAnimationFinished,
    ] = useState(false);

    useEffect(() => {
        const titleText = "Texitor";
        const subtitleText =
            "The modern, simple rich text editor of your dreams.";

        async function typeText() {
            async function* textGenerator(str: string) {
                for (let char of str) {
                    yield new Promise((res) => {
                        setTimeout(() => {
                            res(char);
                        }, Math.random() * 30 + 60);
                    });
                }
            }

            setTimeout(async () => {
                for await (let char of textGenerator(titleText)) {
                    setTitle((text) => text + char);
                }
                setIsTitleAnimationFinished(true);

                setTimeout(async () => {
                    for await (let char of textGenerator(subtitleText)) {
                        setSubtitle((text) => text + char);
                    }
                    setIsSubtitleAnimationFinished(true);
                }, 300);
            }, 500);
        }
        typeText();
    }, []);

    return (
        <Container>
            <LeftSide>
                <Title>
                    {title}
                    {isTitleAnimationFinished ? null : <AnimatedCaret />}
                </Title>
                <Tagline>
                    {subtitle}
                    {isTitleAnimationFinished ? (
                        <AnimatedCaret
                            className={
                                isSubtitleAnimationFinished ? "blink" : ""
                            }
                        />
                    ) : null}
                </Tagline>

                <Button fontSize="1.5em">
                    <Link
                        to="/sign-up"
                        style={{
                            color: "var(--color-5)",
                            textDecoration: "none",
                        }}
                    >
                        Get started
                    </Link>
                </Button>
            </LeftSide>
            <Image src={Gif} alt="" />
        </Container>
    );
}
