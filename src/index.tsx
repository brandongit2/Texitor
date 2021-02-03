import "firebase/auth";
import "firebase/database";
import Loading from "./Loading";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { FirebaseAppProvider } from "reactfire";

import App from "./App";
import store from "./store";

require('dotenv').config()

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID_ID,
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
