import React from "react";
import { useNavigate } from "react-router-dom";
import { signOutRequest } from "../../api/userRequest";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import "./home.scss";

const Home = () => {
  const { userState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
      <h1>{userState.accessToken}</h1>
      <button
        onClick={async () => {
          await dispatch(signOutRequest());
          navigate("/");
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Home;
