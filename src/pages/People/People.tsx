import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { Followers, Following } from "..";
import style from "./people.module.scss";

interface PeopleProps {
  type: "following" | "followers";
}

export default function People({ type }: PeopleProps) {
  const navigate = useNavigate();
  const params = useParams();

  const goBackToProfile = () => {
    navigate(`/${params.username}`);
  };

  const label = `${type.charAt(0).toUpperCase()}${type.slice(1)}`;

  return (
    <>
      <div className={style["header"]}>
        <button onClick={goBackToProfile}>
          <HiArrowLeft />
        </button>{" "}
        <span>{label}</span>
      </div>
      {type === "following" && <Following />}
      {type === "followers" && <Followers />}
    </>
  );
}
