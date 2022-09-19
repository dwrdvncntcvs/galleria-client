import React from "react";
import { AdjustedNavContainer, ContentContainer } from "../../layouts";
import "./profile.scss";

export default function Profile() {
  return (
    <AdjustedNavContainer>
      <div className="profile__main-container">
        <ContentContainer>
          <section>
            <h1>Profile</h1>
          </section>
          <section>
            <h1>Side</h1>
          </section>
        </ContentContainer>
      </div>
    </AdjustedNavContainer>
  );
}
