import styled from "styled-components";

import SaveImage from "../images/SaveDoc.svg";
import EditImage from "../images/EditDoc.svg";

const Container = styled.div`
    width: 80%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    column-gap: 5rem;
    align-content: center;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: var(--color-4);
    padding: 20px 10% 20px 10%;

    @media (max-width: 760px) {
        height: auto;
    }
`;

const ContentGrid = styled.div`
    display: grid;
    grid-auto-flow: column;
    column-gap: 4rem;

    @media (max-width: 760px) {
        grid-auto-flow: row;
    }
`;

const GridDiv = styled.div``;

const GridP = styled.p`
    font-size: 18px;
    min-height: 90px;
`;

const ContentHeader = styled.h1`
    margin-bottom: 35px;
    font-weight: bold;
    font-size: 36px;
`;

const SecondHeader = styled.h3`
    font-weight: bold;
    font-size: 23px;
    margin-bottom: 15px;
`;

const ContentImg = styled.img`
    width: 300px;
`;

export default function Content() {
    return (
        <Container>
            <ContentHeader>Some of our features:</ContentHeader>
            <ContentGrid>
                <GridDiv>
                    <ContentImg src={EditImage} />
                    <SecondHeader>Write and edit seamlessly</SecondHeader>
                    <GridP>
                        Customize your text easily with Texitor! You can change
                        your font size, font color, font decorations, add
                        Hyperlinks, and more. You will also be notified of any
                        spelling or grammer mistakes that you have made.
                    </GridP>
                </GridDiv>
                <GridDiv>
                    <ContentImg src={SaveImage} />
                    <SecondHeader>Save your edits and documents</SecondHeader>
                    <GridP>
                        Don't worry about losing your progress! As you write,
                        Texitor will automatically save your changes and show
                        you when your last autosave was. We will also show you
                        all your saved documents in one place for your
                        convenience.
                    </GridP>
                </GridDiv>
            </ContentGrid>
        </Container>
    );
}
