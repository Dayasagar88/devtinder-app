import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnections: (state, action) => action.payload,
    removeConnections: (state, action) => [],
  },
});

export default connectionSlice.reducer;
export const { addConnections, removeConnections } = connectionSlice.actions;
