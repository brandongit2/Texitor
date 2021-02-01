import styled from "styled-components";

const Copyright = styled.p`
    margin: 1rem 0px;
    width: 100%;
    text-align: center;
`;

export default function Footer() {
    return (
        <div>
            <Copyright>© 2021 Brandon Tsang, Stephanie Hou.</Copyright>
        </div>
    );
}
