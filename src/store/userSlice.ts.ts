import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {User} from "../modole/User.ts";

const storedUser = localStorage.getItem("abdkhha");

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: storedUser ? JSON.parse(storedUser) : null,
};

export const userSlice = createSlice({
    name: 'abdkhha',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            localStorage.setItem("abdkhha", JSON.stringify(action.payload));
        },
        clearUser(state) {
            state.user = null;
            localStorage.removeItem("abdkhha");
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;