import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import { useUser } from "reactfire";
import styled from "styled-components";

import "App.css";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import SigningIn from "./auth/SigningIn";
import SigningOut from "./auth/SigningOut";
import SignInOutButton from "./auth/SignInOutButton";
import Documents from "./Documents";
import Editor from "./Editor";
import Homepage from "./Homepage";
import { actions, useSelector } from "./store";
import Loading from "./Loading";

const Header = styled.header`
    position: sticky;
    top: 0px;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    padding-bottom: 0px;
`;

const Logo = styled.div`
    font-size: 1.5em;
    font-weight: 800;
`;

interface AuthenticatedRouteProps {
    path: string;
    children?: React.ReactNode;
}
function AuthenticatedRoute({ path, children }: AuthenticatedRouteProps) {
    const user = useSelector((state) => state.user);

    switch (user.status) {
        case "signedin":
            return <Route path={path}>{children}</Route>;
        case "loading":
            return <Loading />;
        case "signedout":
            return (
                <Route path={path}>
                    <Redirect to="/sign-in" />
                </Route>
            );
    }
}

export default function App() {
    const { data } = useUser(undefined, { suspense: true });
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            dispatch(
                actions.signIn({ uid: data.uid, email: data.email as string })
            );
        } else {
            dispatch(actions.signOut());
        }
    }, [data, dispatch]);

    return (
        <BrowserRouter>
            <Header>
                <Link to="/">
                    <Logo>Texitor</Logo>
                </Link>
                <SignInOutButton />
            </Header>
            <Switch>
                <Route path="/signing-in">
                    <SigningIn />
                </Route>
                <Route path="/signing-out">
                    <SigningOut />
                </Route>
                <Route path="/sign-in">
                    <SignIn />
                </Route>
                <Route path="/sign-up">
                    <SignUp />
                </Route>
                <AuthenticatedRoute path="/documents">
                    <Documents />
                </AuthenticatedRoute>
                <AuthenticatedRoute path="/edit">
                    <Editor />
                </AuthenticatedRoute>
                <Route path="/">
                    <Homepage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
