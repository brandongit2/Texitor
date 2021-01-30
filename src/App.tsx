import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Homepage from "./homepage";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <Homepage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
