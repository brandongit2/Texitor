import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useUser } from "reactfire";
import { useEffect } from "react";

import "App.css";
import Documents from "./Documents";
import Homepage from "./Homepage";
import Editor from "./Editor";
import SignIn from "./SignIn";
import { actions, useSelector } from "./store";
import SignUp from "./SignUp";
import SignInOutButton from "./SignInOutButton";
import SigningOut from "./SigningOut";

interface AuthenticatedRouteProps {
    path: string;
    children?: React.ReactNode;
}
function AuthenticatedRoute({ path, children }: AuthenticatedRouteProps) {
    const user = useSelector((state) => state.user);

    return (
        <Route path={path}>
            {user.email ? children : <Redirect to="/sign-in" />}
        </Route>
    );
}

export default function App() {
    const { data } = useUser(undefined, { suspense: true });
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            dispatch(actions.signIn(data.email));
        } else {
            dispatch(actions.signOut());
        }
    }, [data, dispatch]);
    return (
        <BrowserRouter>
            <SignInOutButton />
            <Switch>
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
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route exact path="/editor">
                    <Editor />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
