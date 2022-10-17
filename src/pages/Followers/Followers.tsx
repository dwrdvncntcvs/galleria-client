import React from "react";
import { PeopleCard } from "../../components/People";
import EmptyPeopleMessage from "../../components/People/EmptyPeopleMessage/EmptyPeopleMessage";
import { useAppSelector } from "../../hooks/reduxHook";
import {} from "../../hooks/usePrivateAxios";
import { PeopleType } from "../../models/GenericTypes";
import style from "./followers.module.scss";

interface FollowersProps {
  type?: PeopleType;
}

export default function Followers({ type }: FollowersProps) {
  const { userFollowers } = useAppSelector((state) => state.followerState);

  return (
    <div className={style["main-container"]}>
      {userFollowers.followers.map((user) => (
        <PeopleCard user={user} type={type} key={user.id} />
      ))}
      <EmptyPeopleMessage
        users={userFollowers.followers}
        message="You don't have any followers at the moment."
      />
    </div>
  );
}
