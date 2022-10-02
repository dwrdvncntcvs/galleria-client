import React from "react";
import style from "./navDropdown.module.scss";
import { HiUser, HiLogout } from "react-icons/hi";
import { Dropdown } from "../../../layouts";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../../../models/User";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { signOutRequest } from "../../../api/userRequest";
import { closeToggle } from "../../../features/toggleSlice";
import { resetPostState } from "../../../features/postSlice";
import { resetUserState } from "../../../features/userSlice";

interface NavDropdownProps {
  user: UserProfile;
}

export default function NavDropdown({ user }: NavDropdownProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const actionsArr = [
    {
      Icon: HiUser,
      name: "Profile",
      action: async () => {
        dispatch(closeToggle());
        navigate(`/${user.username}`, { replace: true });
      },
    },
    {
      action: async () => {
        dispatch(closeToggle());
        const res = await dispatch(signOutRequest());

        if (res.meta.requestStatus === "fulfilled") {
          dispatch(resetPostState());
          dispatch(resetUserState());
          navigate("/");
        }
      },
      Icon: HiLogout,
      name: "Logout",
    },
  ];

  return (
    <Dropdown>
      {actionsArr.map(({ Icon, action, name }, i) => (
        <button className={style["nav-dropdown-menu"]} key={i} onClick={action}>
          <Icon /> {name}
        </button>
      ))}
    </Dropdown>
  );
}