import React from "react";
import "./navDropdown.scss";
import { HiUser, HiLogout } from "react-icons/hi";
import { Dropdown } from "../../../layouts";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../../../models/User";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { signOutRequest } from "../../../api/userRequest";

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
      action: async () => navigate(`/${user.username}`),
    },
    {
      action: async () => {
        dispatch(signOutRequest());
        navigate("/");
      },
      Icon: HiLogout,
      name: "Logout",
    },
  ];

  return (
    <Dropdown>
      {actionsArr.map(({ Icon, action, name }, i) => (
        <button className="navdrp__elements" key={i} onClick={action}>
          <Icon /> {name}
        </button>
      ))}
    </Dropdown>
  );
}
