import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserFollowing } from "../../api/followerRequest";
import { PeopleCard } from "../../components/People";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { usePrivateAxios } from "../../hooks/usePrivateAxios";
import { PeopleType } from "../../models/GenericTypes";
import style from "./following.module.scss";

interface FollowingProps {
  type?: PeopleType;
}

export default function Following({ type }: FollowingProps) {
  const dispatch = useAppDispatch();
  const { userFollowing } = useAppSelector((state) => state.followerState);
  const params = useParams();
  const privateAxiosInstance = usePrivateAxios();

  useEffect(() => {
    dispatch(
      getUserFollowing({ username: params.username!, privateAxiosInstance })
    );
  }, []);

  return (
    <div className={style["main-container"]}>
      {userFollowing.following.map((user) => (
        <PeopleCard userProfile={user} type={type} />
      ))}
    </div>
  );
}
