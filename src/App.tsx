import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { MainContainer, NavBar } from "./components/global";
import { Home, Otp, Portal, Profile, SignIn, SignUp } from "./pages";
import { Persistent, RequiredAuth } from "./routes";

function App() {
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
    </MainContainer>
  );
}

export default App;
