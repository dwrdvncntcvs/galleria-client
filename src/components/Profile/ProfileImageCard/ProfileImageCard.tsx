import React from "react";
import style from "./profileImageCard.module.scss";
import { UpdateUserData, UserProfile } from "../../../models/User";
import { defaultAvatar } from "../../../assets/images";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { followUserRequest } from "../../../api/followerRequest";
import { setModal } from "../../../features/modalSlice";
import EditProfile from "../EditProfile/EditProfile";
import { convertDateOfBirth } from "../../../utils/helper";

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
  const dispatch = useAppDispatch();

  const profileData: UpdateUserData = {
    address: profile.Profile?.address!,
    dateOfBirth: convertDateOfBirth(profile.Profile?.dateOfBirth!),
    first_name: profile.first_name!,
    last_name: profile.last_name!,
    username: profile.username!,
    bio: profile.Profile?.bio!,
  };

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
            props: { userId: profile.id, profileData },
          })
        ),
    },
  ];

  return (
    <div className={style["profile-container"]}>
      <div className={style["profile-link"]}>
        <img
          src={
            profile.Profile?.profileImage === ""
              ? defaultAvatar
              : profile.Profile?.profileImage
          }
          alt={`${profile.first_name}'s avatar'`}
        />
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
