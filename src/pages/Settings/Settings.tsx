import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SettingsNav } from "../../components/Settings";
import { useAppSelector } from "../../hooks/reduxHook";
import useLocalStorage from "../../hooks/useLocalStorage";
import { SettingsLayout, SettingsPageLayout } from "../../layout";
import { SettingsData } from "../../models/Settings";
import style from "./settings.module.scss";

export default function Settings() {
  const { addItem: accountAddItem, getItemJSON: getAccountData } =
    useLocalStorage("accountInfo");

  const { userData } = useAppSelector((state) => state.userState);
  const { Profile, email, username, id } = userData!;

  const accData = getAccountData<SettingsData>();

  useEffect(() => {
    if (
      accData === null ||
      accData === undefined ||
      Array.of(accData).length <= 1
    ) {
      accountAddItem<SettingsData>({
        contact_number: Profile?.contactNumber!,
        email: email!,
        username: username!,
        userId: id!,
      });
    }
  }, [
    accountAddItem,
    getAccountData,
    Profile?.contactNumber,
    email,
    username,
    id,
    accData,
  ]);

  const mainPanel = (
    <SettingsLayout>
      {accData !== null && <Outlet context={accData} />}
    </SettingsLayout>
  );

  const settingsNav = <SettingsNav />;

  return <SettingsPageLayout mainPanel={mainPanel} settingsNav={settingsNav} />;
}
