import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { Home, Portal, SignIn, SignUp } from "./pages";
import { RestrictedRoutes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portal />}>
          <Route path="" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route path="" element={<RestrictedRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
