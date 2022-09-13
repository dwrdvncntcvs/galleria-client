import React from "react";
import { Link } from "react-router-dom";
import { UserProfile } from "../../../models/User";
import { HiOutlineHome } from "react-icons/hi";
import "./navLinks.scss";

interface NavLinksProps {
  user: UserProfile;
}

export default function NavLinks({ user }: NavLinksProps) {
  const links = [
    { to: "/home", isIcon: true, Icon: HiOutlineHome },
    {
      to: "/",
      isImage: true,
      image: {
        src: user.Profile?.profileImage,
        alt: `${user.first_name}'s avatar`,
      },
    },
  ];

  return (
    <nav>
      {links.map(({ to, isIcon, Icon, isImage, image }) => {
        let component: any;

        if (isIcon)
          component = (
            <Link className="nl__button-link" to={to}>
              <Icon size={15} />
            </Link>
          );
        else if (isImage)
          component = (
            <Link className="nl__button-link" to={to}>
              <img src={image.src} alt={image.alt} />
            </Link>
          );

        return component;
      })}
    </nav>
  );
}
