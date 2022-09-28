import React, { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserProfile } from "../../../models/User";
import { HiOutlineHome, HiHome, HiPlus, HiUser } from "react-icons/hi";
import style from "./navLinks.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { setModal } from "../../../features/modalSlice";
import { setToggle } from "../../../features/toggleSlice";
import NavDropdown from "../NavDropdown/NavDropdown";
import { defaultAvatar } from "../../../assets/images";
import RoundedAvatar from "../RoundedAvatar/RoundedAvatar";
import { resetPostState } from "../../../features/postSlice";

interface NavLinksProps {
  user: UserProfile;
}

export default function NavLinks({ user }: NavLinksProps) {
  const { toggleState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

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
        navigate("/home");
        dispatch(resetPostState());
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
      action: () =>
        dispatch(
          setToggle({
            status: toggleState.status ? false : true,
            name: "createNavDropdown",
          })
        ),
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
          {toggleState.status &&
            toggleState.name === "createNavDropdown" &&
            isDropdown && <NavDropdown user={user!} />}
        </Fragment>
      ))}
    </nav>
  );
}
