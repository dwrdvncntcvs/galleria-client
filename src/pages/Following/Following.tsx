import React from "react";
import { PeopleCard } from "../../components/People";
import EmptyPeopleMessage from "../../components/People/EmptyPeopleMessage/EmptyPeopleMessage";
import { useAppSelector } from "../../hooks/reduxHook";
import { PeopleType } from "../../models/GenericTypes";
import style from "./following.module.scss";

interface FollowingProps {
  type?: PeopleType;
}

export default function Following({ type }: FollowingProps) {
  const { userFollowing } = useAppSelector((state) => state.followerState);

  return (
    <div className={style["main-container"]}>
      {userFollowing.following.map((user) => (
        <PeopleCard user={user} type={type} key={user.id} />
      ))}
      <EmptyPeopleMessage
        users={userFollowing.following}
        message="Currently you doesn't follow anyone."
      />
    </div>
  );
}
