import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
  token: string | null;
}

const initialState: UserState = {
  username: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    logout(state) {
      state.username = null;
      state.token = null;
    },
  },
});

export const { setUsername, setToken } = userSlice.actions;
export default userSlice.reducer;
