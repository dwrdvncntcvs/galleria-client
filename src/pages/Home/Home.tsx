import React from "react";
import { useNavigate } from "react-router-dom";
import { signOutRequest } from "../../api/userRequest";
import { useAppDispatch } from "../../hooks/reduxHook";
import "./home.scss";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
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
