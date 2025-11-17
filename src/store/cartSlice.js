const { createSlice } = require("@reduxjs/toolkit");


const initialState = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        remove(state, action) {
            return state.filter((item) => item.id !== action.payload);
        },
        clear() {
      return []; // Cart empty kar dega
    },
    },
});


export const { add, remove, clear } = cartSlice.actions;
export default cartSlice.reducer;
