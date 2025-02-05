import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionRequestReducer from "./connectionRequestSlice"
import connectionReducer from "./connectionSlice"

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connectionRequests : connectionRequestReducer ,
    connections : connectionReducer 
  },
});

export default appStore;
