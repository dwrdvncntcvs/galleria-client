import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserFollowers } from "../../api/followerRequest";
import { PeopleCard } from "../../components/People";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { usePrivateAxios } from "../../hooks/usePrivateAxios";
import { PeopleType } from "../../models/GenericTypes";
import style from "./followers.module.scss";

interface FollowersProps {
  type?: PeopleType;
}

export default function Followers({ type }: FollowersProps) {
  const dispatch = useAppDispatch();
  const { userFollowers } = useAppSelector((state) => state.followerState);
  const params = useParams();
  const privateInstance = usePrivateAxios();

  useEffect(() => {
    dispatch(
      getUserFollowers({
        username: params.username!,
        privateAxiosInstance: privateInstance,
      })
    );
  }, []);

  return (
    <div className={style["main-container"]}>
      {userFollowers.followers.map((element) => (
        <PeopleCard userProfile={element} type={type} />
      ))}
    </div>
  );
}
