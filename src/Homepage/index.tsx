import { Redirect } from "react-router-dom";
import styled from "styled-components";

import Content from "./Content";
import Footer from "./Footer";
import Hero from "./Hero";
import { useSelector } from "../store";

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
            <Hero />
            <Content />
            <Footer />
        </Container>
    );
}
