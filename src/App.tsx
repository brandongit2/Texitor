import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useUser } from "reactfire";

import "App.css";
import Documents from "Documents";
import Homepage from "Homepage";
import Loading from "Loading";
import SignIn from "SignIn";
import { actions, useSelector } from "store";
import SignUp from "SignUp";
import SignInOutButton from "SignInOutButton";
import { useEffect } from "react";
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
    const { status, data } = useUser();
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "success") {
            if (data) {
                dispatch(actions.signIn(data.email));
            } else {
                dispatch(actions.signOut());
            }
        }
    }, [status, data, dispatch]);

    if (status === "loading") return <Loading />;
    return (
        <BrowserRouter>
            <SignInOutButton />
            <Switch>
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
