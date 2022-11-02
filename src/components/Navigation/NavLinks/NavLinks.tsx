import React, { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserProfile } from "../../../models/User";
import { HiOutlineHome, HiHome, HiPlus, HiUser } from "react-icons/hi";
import style from "./navLinks.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { setModal } from "../../../features/modalSlice";
import { setToggle } from "../../../features/toggleSlice";
import { resetPostState } from "../../../features/postSlice";
import { RoundedAvatar } from "../../global";
import { NavDropdown } from "..";
import { useCheckToggle } from "../../../hooks/toggleHooks";
import { useImageSrc } from "../../../hooks/imageHooks";
import { modalName } from "../../../variables";
import { IconType } from "react-icons/lib";

interface NavLinksProps {
  user: UserProfile;
}

interface NavButtonProps {
  Icon: IconType;
  hasImage: boolean;
  isDropdown: boolean;
  shown: boolean;
  action: () => void;
  image?: {
    src: string;
    alt: string;
  };
}

export default function NavLinks({ user }: NavLinksProps) {
  const { toggleState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const checkIfToggled = useCheckToggle();
  const imageSrc = useImageSrc();

  const activeURL = (endpoint: string) => {
    return endpoint === location.pathname ? true : false;
  };

  const navButtons: NavButtonProps[] = [
    {
      Icon: HiPlus,
      hasImage: false,
      isDropdown: false,
      shown: location.pathname.includes("settings") ? false : true,
      action: () =>
        dispatch(setModal({ status: true, name: modalName.CREATE_POST_MODAL })),
    },
    {
      Icon: activeURL("/home") ? HiHome : HiOutlineHome,
      shown: true,
      hasImage: false,
      isDropdown: false,
      action: async () => {
        dispatch(resetPostState());
        navigate("/home");
      },
    },
    {
      Icon: HiUser,
      shown: true,
      image: {
        src: imageSrc(user.Profile?.profileImage!),
        alt: `${user.first_name}'s avatar`,
      },
      hasImage: true,
      isDropdown: true,
      action: () =>
        dispatch(
          setToggle({
            status: !toggleState.status,
            name: toggleState.status ? "" : modalName.CREATE_POST_MODAL,
          })
        ),
    },
  ];

  return (
    <nav>
      {navButtons.map(
        ({ action, Icon, hasImage, image, isDropdown, shown }, i) => (
          <Fragment key={i}>
            {shown && (
              <button onClick={action} className={style["button-link"]}>
                {hasImage ? (
                  <RoundedAvatar src={image?.src!} alt={image?.alt!} />
                ) : (
                  <Icon size={18} />
                )}
              </button>
            )}
            {checkIfToggled(modalName.CREATE_POST_MODAL) && isDropdown && (
              <NavDropdown user={user!} />
            )}
          </Fragment>
        )
      )}
    </nav>
  );
}
