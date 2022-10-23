import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import BackButton from "./components/global/ClosePostButton/ClosePostButton";
import { NavBar } from "./components/Navigation";
import { EditPostModal } from "./components/Post";
import { MainContainer, ModalOverlay } from "./UI";
import {
  Gallery,
  Home,
  Otp,
  People,
  PersonalInfoSettings,
  Portal,
  Profile,
  ProfileDetails,
  SecuritySettings,
  Settings,
  SignIn,
  SignUp,
} from "./pages";
import PostDetails from "./pages/PostDetails/PostDetails";
import { Persistent, RequiredAuth } from "./routes";
import { useActiveModal } from "./hooks/modalHooks";
import { modalName } from "./variables";

function App() {
  const checkIfModalActive = useActiveModal();

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
              <Route path="/settings/" element={<Settings />}>
                <Route path="personal" element={<PersonalInfoSettings />} />
                <Route path="security" element={<SecuritySettings />} />
              </Route>
            </Route>
            <Route path="/:username/" element={<Profile />}>
              <Route path="" element={<ProfileDetails />} />
              <Route path="followers" element={<People type="followers" />} />
              <Route path="following" element={<People type="following" />} />
              <Route
                path="gallery"
                element={
                  <ModalOverlay
                    backButtonComponent={BackButton}
                    hasBackButton={true}
                    isBackdropBlur={false}
                  >
                    <Gallery />
                  </ModalOverlay>
                }
              />
            </Route>
            <Route path="/post/:id" element={<PostDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {checkIfModalActive(modalName.EDIT_POST_MODAL) && <EditPostModal />}
    </MainContainer>
  );
}

export default App;
