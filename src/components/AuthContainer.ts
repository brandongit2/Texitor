import styled from "styled-components";

export default styled.div`
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 40% 60%;
    place-items: center;

    @media (max-width: 760px) {
        grid-template-columns: 55% 45%;
    }

    @media (max-width: 560px) {
        display: flex;
        flex-direction: column;
    }
`;
