import React from "react";
import { HiLockClosed, HiUser } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { Link, useLocation } from "react-router-dom";
import { SideFooter } from "../../global";
import style from "./settingsNav.module.scss";

type SettingsNavButton = {
  Icon: IconType;
  label: string;
  link: string;
  isActive: boolean;
};

const isLocationActive = (pathname: string, link: string) =>
  pathname.includes(link);

export default function SettingsNav() {
  const location = useLocation();

  const buttonsArr: SettingsNavButton[] = [
    {
      Icon: HiUser,
      label: "Account",
      link: "personal",
      isActive: isLocationActive(location.pathname, "personal"),
    },
    {
      Icon: HiLockClosed,
      label: "Security",
      link: "security",
      isActive: isLocationActive(location.pathname, "security"),
    },
  ];

  return (
    <aside className={style["settings-nav"]}>
      <h1>Settings</h1>
      <nav>
        {buttonsArr.map(({ Icon, label, link, isActive }, i) => (
          <Link to={link} className={isActive ? style["active"] : ""} key={i}>
            <Icon size={20} /> {label}
          </Link>
        ))}
      </nav>
      <SideFooter />
    </aside>
  );
}
