import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useUser } from "reactfire";

import "App.css";
import Documents from "Documents";
import Homepage from "Homepage";
import SignIn from "SignIn";
import { actions, useSelector } from "store";
import SignUp from "SignUp";
import SignInOutButton from "SignInOutButton";
import { useEffect } from "react";
import SigningIn from "SigningIn";
import SigningOut from "SigningOut";

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
            dispatch(
                actions.signIn({ uid: data.uid, email: data.email as string })
            );
        } else {
            dispatch(actions.signOut());
        }
    }, [data, dispatch]);

    return (
        <BrowserRouter>
            <SignInOutButton />
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
                <Route path="/">
                    <Homepage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
