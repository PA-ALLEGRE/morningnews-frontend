import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

export const hiddenArticlesSlice = createSlice({
    name:'hiddenArticles',
    initialState,
    reducers: {
        saveHiddenArticles: (state, action) => {
            state.value.push(action.payload);
        },
        restoreHiddenArticles: (state, action) => {
            state.value = [];
        }
    },
});

export const { saveHiddenArticles, restoreHiddenArticles } = hiddenArticlesSlice.actions;
export default hiddenArticlesSlice.reducer;