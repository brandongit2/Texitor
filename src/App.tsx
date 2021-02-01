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
import Documents from "./Documents";
import Editor from "./Editor";
import Homepage from "./Homepage";
import { actions, useSelector } from "./store";
import Loading from "./Loading";

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

const Logo = styled.div`
    position: absolute;
    font-family: "AnonymousPro";
    margin: 14px;
    font-size: 30px;
    font-weight: bold;
`;

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
            <Link to="/">
                <Logo>
                    <p>Texitor</p>
                </Logo>
            </Link>
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
