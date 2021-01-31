import styled from "styled-components";

export const Button = styled.button`
    background: var(--color-1);
    color: var(--color-5);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    cursor: pointer;
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
