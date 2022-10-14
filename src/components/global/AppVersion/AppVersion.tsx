import React from "react";
import style from "./appVersion.module.scss";
import app from "../../../../package.json";

export default function AppVersion() {
  return <div>Build Version {app.version}</div>;
}
