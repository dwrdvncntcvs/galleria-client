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
import { useActiveModal } from "../../../hooks/modalHooks";
import { ViewImage } from "../../Images";

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
  const { toggleState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const checkIfToggled = useCheckToggle();
  const checkIfModalActive = useActiveModal();

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

  const imageSrc =
    profile.Profile?.profileImage === ""
      ? defaultAvatar
      : profile.Profile?.profileImage;

  return (
    <div className={style["profile-container"]}>
      <div className={style["profile-link"]}>
        <img
          onClick={toggleImageAction}
          src={imageSrc}
          alt={`${profile.first_name}'s avatar'`}
        />
        {checkIfToggled("imageAction") && <ImageAction imageSrc={imageSrc!} />}
      </div>
      {buttonsArr.map(
        ({ action, condition, label }, i) =>
          condition && (
            <button className={style["follow-btn"]} onClick={action} key={i}>
              {label}
            </button>
          )
      )}
      {checkIfModalActive("updateProfileModal") && <EditProfile />}
      {checkIfModalActive("viewImageProfileModal") && <ViewImage />}
    </div>
  );
}
