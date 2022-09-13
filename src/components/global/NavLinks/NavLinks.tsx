import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserProfile } from "../../../models/User";
import { HiOutlineHome, HiHome } from "react-icons/hi";
import "./navLinks.scss";

interface NavLinksProps {
  user: UserProfile;
}

export default function NavLinks({ user }: NavLinksProps) {
  const location = useLocation();

  const activeURL = (endpoint: string) => {
    return endpoint === location.pathname ? true : false;
  };

  const links = [
    {
      to: "/home",
      isIcon: true,
      Icon: activeURL("/home") ? HiHome : HiOutlineHome,
      isActive: activeURL("/home"),
    },
    {
      to: `/${user.username}`,
      isImage: true,
      image: {
        src: user.Profile?.profileImage,
        alt: `${user.first_name}'s avatar`,
      },
      isActive: activeURL(`/${user.username}`),
    },
  ];

  return (
    <nav>
      {links.map(({ to, isIcon, Icon, isImage, image, isActive }, i) => {
        let component: any;
        console.log(isActive);
        if (isIcon)
          component = (
            <Link className="nl__button-link" to={to} key={i}>
              <Icon size={18} />
            </Link>
          );
        else if (isImage)
          component = (
            <Link className="nl__button-link" to={to} key={i}>
              <img src={image.src} alt={image.alt} />
            </Link>
          );

        return component;
      })}
    </nav>
  );
}
