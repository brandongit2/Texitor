import styled from "styled-components";

export default styled.div`
    height: 100vh;
    padding: 0px 40px;
    justify-content: center;
    align-content: center;
    display: flex;
    flex-direction: column;

    @media(max-width: 560px) {
        order: 2;
    }
`;