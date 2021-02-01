import styled from "styled-components";

export default styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 40% 60%;

    @media(max-width: 760px) {
        grid-template-columns: 55% 45%;
    }

    @media(max-width: 560px) {
        display: flex;
        flex-direction: column;
    }
`;