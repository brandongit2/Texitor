import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
    useSelector as untypedUseSelector,
    TypedUseSelectorHook,
} from "react-redux";

const userSlice = createSlice({
    name: "user",
    initialState: {
        email: null as null | string,
    },
    reducers: {
        signIn: (state, action) => ({
            email: action.payload,
        }),
        signOut: () => ({
            email: null,
        }),
    },
});

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});
export default store;
export const actions = userSlice.actions;
export type RootState = ReturnType<typeof store.getState>;

export const useSelector: TypedUseSelectorHook<RootState> = untypedUseSelector;
