import React, { useEffect } from "react";
import { getSuggestedPeopleRequest } from "../../../api/followerRequest";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { usePrivateAxios } from "../../../hooks/usePrivateAxios";
import PersonCard from "../PersonCard/PersonCard";
import "./sidePanel.scss";

export default function SidePanel() {
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
    <div className="sp__side-container">
      <h1>People you might know</h1>
      {followerState.suggestedPeople.map((user, i) => (
        <PersonCard user={user} key={i} />
      ))}
    </div>
  );
}
