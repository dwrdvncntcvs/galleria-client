import React, { useEffect } from "react";
import { getSuggestedPeopleRequest } from "../../../api/followerRequest";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { usePrivateAxios } from "../../../hooks/usePrivateAxios";
import PersonCard from "../../Home/PersonCard/PersonCard";
import style from "./suggestPeople.module.scss";

export default function SuggestedPeople() {
  const { followerState, userState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const privateInstance = usePrivateAxios();

  useEffect(() => {
    const getData = async () => {
      await dispatch(getSuggestedPeopleRequest({ privateInstance }));
    };

    getData();
  }, [userState.userData]);

  return (
    <div className={style["suggested-people"]}>
      <h1>People you might know</h1>
      {followerState.suggestedPeople.map((user, i) => (
        <PersonCard user={user} key={i} />
      ))}
    </div>
  );
}
