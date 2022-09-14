import React from "react";
import {
  AdjustedNavContainer,
  ContentContainer,
  StickyPanel,
} from "../../components/global";
import { CreatePost, Posts, SidePanel } from "../../components/Home";
import { useAppSelector } from "../../hooks/reduxHook";
import "./home.scss";

const Home = () => {
  const { userState } = useAppSelector((state) => state);

  return (
    <AdjustedNavContainer>

    <div className="h__main-container">
        <ContentContainer>
          <section>
            <CreatePost
              userId={userState.userData?.id!}
              imageUrl={userState.userData?.Profile?.profileImage!}
              firstName={userState.userData?.first_name!}
            />
            <Posts />
          </section>
          <section>
            <StickyPanel>
              <SidePanel />
            </StickyPanel>
          </section>
        </ContentContainer>
    </div>
      </AdjustedNavContainer>

  );
};

export default Home;
