import React, { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserProfile } from "../../../models/User";
import { HiOutlineHome, HiHome, HiPlus, HiUser } from "react-icons/hi";
import style from "./navLinks.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { setModal } from "../../../features/modalSlice";
import { closeToggle, setToggle } from "../../../features/toggleSlice";
import { defaultAvatar } from "../../../assets/images";
import { resetPostState } from "../../../features/postSlice";
import { RoundedAvatar } from "../../global";
import { NavDropdown } from "..";
import { useCheckToggle } from "../../../hooks/toggleHooks";

interface NavLinksProps {
  user: UserProfile;
}

export default function NavLinks({ user }: NavLinksProps) {
  const { toggleState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const checkIfToggled = useCheckToggle();

  const activeURL = (endpoint: string) => {
    return endpoint === location.pathname ? true : false;
  };

  const navButtons = [
    {
      Icon: HiPlus,
      hasImage: false,
      isDropdown: false,
      action: () =>
        dispatch(setModal({ status: true, name: "createPostModal" })),
    },
    {
      Icon: activeURL("/home") ? HiHome : HiOutlineHome,
      hasImage: false,
      isDropdown: false,
      action: async () => {
        dispatch(resetPostState());
        navigate("/home");
      },
    },
    {
      Icon: HiUser,
      image: {
        src:
          user.Profile?.profileImage !== ""
            ? user.Profile?.profileImage
            : defaultAvatar,
        alt: `${user.first_name}'s avatar`,
      },
      hasImage: true,
      isDropdown: true,
      action: () => {
        if (!checkIfToggled("createNavDropdown")) {
          console.log("Toggling");
          dispatch(setToggle({ name: "createNavDropdown", status: true }));
        } else {
          console.log("Closing");
          dispatch(closeToggle("createNavDropdown"));
        }
      },
    },
  ];

  return (
    <nav>
      {navButtons.map(({ action, Icon, hasImage, image, isDropdown }, i) => (
        <Fragment key={i}>
          <button onClick={action} className={style["button-link"]}>
            {hasImage ? (
              <RoundedAvatar src={image?.src!} alt={image?.alt!} />
            ) : (
              <Icon size={18} />
            )}
          </button>
          {checkIfToggled("createNavDropdown") && isDropdown && (
            <NavDropdown user={user!} />
          )}
        </Fragment>
      ))}
    </nav>
  );
}
