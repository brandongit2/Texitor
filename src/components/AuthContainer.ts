import styled from "styled-components";

export default styled.div`
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 40% 60%;
    place-items: center;


    @media (max-width: 850px) {
        grid-template-columns: 50% 50%;
    }

    @media (max-width: 700px) {
        grid-template-columns: 60% 40%;
    }

    @media (max-width: 600px) {
        display: flex;
        flex-direction: column-reverse;
        justify-content: flex-end;
    }
`;
