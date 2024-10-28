import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserState {
  username: string;
  name: string;
  profilePic: string;
}

const initialState: UserState = {
  username: '',
  name: '',
  profilePic: '',
};

export const fetchProfilePic = createAsyncThunk<string, void, { state: RootState }>(
  'user/fetchProfilePic',
  async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRhMDA2MjcwMTNkOTRiMDAxZGI5NjUxMjI5OTFkNSIsIm5iZiI6MTcyMjgwNTg5MC4wNjY5OTgsInN1YiI6IjY1ZmQ3YjdjN2Y2YzhkMDE3YzZmMGZjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BIgmgipfgJFlABU5B1xjp3T1RPxAcSLL_l72sS4MuiE'
        }
    };

    const response = await fetch('https://api.themoviedb.org/3/account/21128692?session_id=9730ce6cabeb9b6f4dd2b4e7ba3a4fe46ba80daa', options)
    const data = await response.json();
    return `https://secure.gravatar.com/avatar/${data.avatar.gravatar.hash}.jpg?s=200`; 
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsernameData(state, action: PayloadAction<{ username: string }>) {
      state.username = action.payload.username;
    },
    setNameData(state, action: PayloadAction<{ name: string }>) {
        state.name = action.payload.name;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfilePic.fulfilled, (state, action) => {
      state.profilePic = action.payload;
    });
  },
});

export const { setUsernameData, setNameData } = userSlice.actions;
export default userSlice.reducer;
