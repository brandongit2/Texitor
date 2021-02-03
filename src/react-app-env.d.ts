/// <reference types="react-scripts" />

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_GOOGLE_API_KEY: string;
            REACT_APP_FIREBASE_MEASUREMENTID_ID: string;
            REACT_APP_FIREBASE_APP_ID: string;
            REACT_APP_FIREBASE_SENDER_ID: string;
            REACT_APP_FIREBASE_STORAGE_BUCKET: string;
            REACT_APP_FIREBASE_PROJECT_ID: string;
            REACT_APP_FIREBASE_AUTH_DOMAIN: string;
            REACT_APP_FIREBASE_API_KEY: string;
            NODE_ENV: 'development' | 'production';
        }
    }
}

export {}