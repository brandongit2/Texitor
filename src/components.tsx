import styled from "styled-components";

export const Button = styled.button`
    background: var(--color-1);
    color: var(--color-5);
    border-radius: 8px;
    padding: 0.5rem 1.5rem;
    cursor: pointer;

    &:hover{
        background: var(--color-2);
        color: var(--color-5);
    }
`;

export const BorderButton = styled.button`
    color: var(--color-1);
    border: 1px solid var(--color-1);
    border-radius: 8px;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    background: var(--color-5);

    &:hover{
        background: var(--color-4);
    }
`;

export const Input = styled.input`
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid var(--color-1);
`;

export const Centered = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const SignDiv = styled.div`
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

export const FormDiv = styled.div`
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