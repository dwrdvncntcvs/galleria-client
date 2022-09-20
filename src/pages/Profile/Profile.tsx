import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfileRequest } from "../../api/userRequest";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { AdjustedNavContainer, ContentContainer } from "../../layouts";
import "./profile.scss";

export default function Profile() {
  const { userState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      await dispatch(getUserProfileRequest({ username: params.username! }));
    };

    getData();
  }, []);

  return (
    <AdjustedNavContainer>
      <div className="profile__main-container">
        <ContentContainer>
          <section>
            <h1>Profile</h1>
            {userState.userProfile.first_name}
          </section>
          <section>
            <h1>Side</h1>
          </section>
        </ContentContainer>
      </div>
    </AdjustedNavContainer>
  );
}
