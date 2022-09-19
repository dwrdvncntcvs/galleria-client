import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { NavBar } from "./components/global";
import { CreatePostModal } from "./components/Home";
import { useAppSelector } from "./hooks/reduxHook";
import { MainContainer } from "./layouts";
import { Home, Otp, Portal, Profile, SignIn, SignUp } from "./pages";
import { Persistent, RequiredAuth } from "./routes";

function App() {
  const { status, name } = useAppSelector((state) => state.modalState);

  return (
    <MainContainer>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Portal />}>
            <Route path="" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path=":email/otp" element={<Otp />} />
          </Route>
          <Route path="" element={<Persistent />}>
            <Route element={<RequiredAuth />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/:username" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {status && name === "createPostModal" && <CreatePostModal />}
    </MainContainer>
  );
}

export default App;
