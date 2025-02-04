import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import Login from "./components/Login";
import Hero from "./components/Hero";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Body from "./components/Body";
import Feed from "./components/Feed";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <>
      <Provider store={appStore}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/" element={<Hero />} />
                <Route path="/app" element={<Feed />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        {/* </PersistGate> */}
      </Provider>
    </>
  );
}
