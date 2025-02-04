import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => null,
    updateFeed: (state, action) => {
      const updatedFeed = state.filter((user) => user?._id != action.payload);
      return updatedFeed;
    },
  },
});

export default feedSlice.reducer;
export const { addFeed, removeFeed, updateFeed } = feedSlice.actions;
