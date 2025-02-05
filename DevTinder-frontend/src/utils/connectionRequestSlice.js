import { createSlice } from "@reduxjs/toolkit";

const connectionRequestSlice = createSlice({
  name: "connectionRequests",
  initialState: [],
  reducers: {
    addConnectionRequest: (state, action) => action.payload,
    removeConnectionRequest: (state, action) => [],
  },
});

export default connectionRequestSlice.reducer;
export const { addConnectionRequest, removeConnectionRequest } =
  connectionRequestSlice.actions;
