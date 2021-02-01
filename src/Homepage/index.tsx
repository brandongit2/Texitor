import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";

import { useSelector } from "../store";
import Hero from "./Hero";
import Content from "./Content";
import Footer from "./Footer";
import SignInOutButton from "../auth/SignInOutButton"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export default function Homepage() {
    const user = useSelector((state) => state.user);
    if (user.status === "signedin") {
        return <Redirect to="/documents" />;
    }

    return (
        <Container>
            <SignInOutButton />
            <Hero />
            <Content />
            <Footer />
        </Container>
    );
}
