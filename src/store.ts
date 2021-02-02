import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionTypes } from "Editor/ActionTypes";
import {
    useSelector as untypedUseSelector,
    TypedUseSelectorHook,
} from "react-redux";

const userSlice = createSlice({
    name: "user",
    initialState: {
        status: "loading" as "signedout" | "loading" | "signedin",
        uid: null as null | string,
        email: null as null | string,
    },
    reducers: {
        signIn: (
            state,
            action: PayloadAction<{ email: string; uid: string }>
        ) => ({
            ...state,
            status: "signedin",
            email: action.payload.email,
            uid: action.payload.uid,
        }),
        signOut: (state) => ({
            ...state,
            status: "signedout",
            email: null,
            uid: null,
        }),
    },
});

const editorSlice = createSlice({
    name: "editor",
    initialState: {
        enabledActions: [] as ActionTypes[],
    },
    reducers: {
        setEnabledActions: (
            state,
            action: PayloadAction<{ actions: ActionTypes[] }>
        ) => ({
            ...state,
            enabledActions: action.payload.actions,
        }),
    },
});

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        editor: editorSlice.reducer,
    },
});
export default store;
export const actions = { ...userSlice.actions, ...editorSlice.actions };
export type RootState = ReturnType<typeof store.getState>;

export const useSelector: TypedUseSelectorHook<RootState> = untypedUseSelector;
