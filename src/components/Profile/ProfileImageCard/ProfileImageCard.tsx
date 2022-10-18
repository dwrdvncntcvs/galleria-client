import React from "react";
import style from "./profileImageCard.module.scss";
import { UserProfile } from "../../../models/User";
import { defaultAvatar } from "../../../assets/images";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { followUserRequest } from "../../../api/followerRequest";
import { setModal } from "../../../features/modalSlice";
import EditProfile from "../EditProfile/EditProfile";
import { setToggle } from "../../../features/toggleSlice";
import ImageAction from "../ImageAction/ImageAction";
import { useCheckToggle } from "../../../hooks/toggleHooks";

interface ProfileImageCardProps {
  profile: UserProfile;
  isFollowing: boolean;
  username: string;
}

export default function ProfileImageCard({
  profile,
  isFollowing,
  username,
}: ProfileImageCardProps) {
  const { userData } = useAppSelector((state) => state.userState);
  const { name, status } = useAppSelector((state) => state.modalState);
  const { toggleState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const checkIfToggled = useCheckToggle();

  const buttonsArr = [
    {
      condition: userData?.id !== profile.id && !isFollowing,
      label: "Follow",
      action: async () => {
        await dispatch(followUserRequest({ username }));
      },
    },
    {
      condition: userData?.id === profile.id,
      label: "Edit Profile",
      action: () =>
        dispatch(
          setModal({
            name: "updateProfileModal",
            status: true,
            props: { userId: profile.id },
          })
        ),
    },
  ];

  const toggleImageAction = (e: any) => {
    e.stopPropagation();
    dispatch(
      setToggle({
        name: toggleState.status ? "" : "imageAction",
        status: !toggleState.status,
      })
    );
  };

  return (
    <div className={style["profile-container"]}>
      <div className={style["profile-link"]}>
        <img
          onClick={toggleImageAction}
          src={
            profile.Profile?.profileImage === ""
              ? defaultAvatar
              : profile.Profile?.profileImage
          }
          alt={`${profile.first_name}'s avatar'`}
        />
        {checkIfToggled("imageAction") && <ImageAction />}
      </div>
      {buttonsArr.map(
        ({ action, condition, label }, i) =>
          condition && (
            <button className={style["follow-btn"]} onClick={action} key={i}>
              {label}
            </button>
          )
      )}
      {name === "updateProfileModal" && status && <EditProfile />}
    </div>
  );
}
