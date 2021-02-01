import "firebase/auth";
import "firebase/database";
import Loading from "./Loading";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { FirebaseAppProvider } from "reactfire";

import App from "./App";
import store from "./store";

const firebaseConfig = {
    apiKey: "AIzaSyB7MLx-AenvITq9DshuyDQDCMgxlzgIvxg",
    authDomain: "texitor-91985.firebaseapp.com",
    projectId: "texitor-91985",
    storageBucket: "texitor-91985.appspot.com",
    messagingSenderId: "603573629708",
    appId: "1:603573629708:web:3842b12792cfb16ba10f29",
    measurementId: "G-D85NE80XWP",
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <FirebaseAppProvider firebaseConfig={firebaseConfig}>
                <Suspense fallback={<Loading />}>
                    <App />
                </Suspense>
            </FirebaseAppProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
