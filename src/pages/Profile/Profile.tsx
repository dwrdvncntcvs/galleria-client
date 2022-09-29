import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfileRequest } from "../../api/userRequest";
import { ImageGallery } from "../../components/Gallery";
import { SuggestPeople } from "../../components/global";
import { ProfileCard } from "../../components/Profile";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { AdjustedNavContainer, ContentContainer } from "../../layouts";
import MainPanel from "../../layouts/MainPanel/MainPanel";
import SidePanel from "../../layouts/SidePanel/SidePanel";
import style from "./profile.module.scss";

export default function Profile() {
  const { userState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      await dispatch(getUserProfileRequest({ username: params.username! }));
    };

    getData();
  }, [params.username]);

  return (
    <AdjustedNavContainer>
      <div className={style.profile}>
        <ContentContainer>
          <MainPanel>
            <ProfileCard profile={userState.userProfile} />
          </MainPanel>
          <SidePanel>
            <ImageGallery username={params.username!} />
            <SuggestPeople />
          </SidePanel>
        </ContentContainer>
      </div>
    </AdjustedNavContainer>
  );
}
