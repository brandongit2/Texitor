/// <reference types="react-scripts" />
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GOOGLE_API_KEY: string;
            NODE_ENV: 'development' | 'production';
        }
    }
}

GOOGLE_API_KEY="AIzaSyDlp7QblCmYHBIvq9wWH_bz9NwZCNdyGLk"
