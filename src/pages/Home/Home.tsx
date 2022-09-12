import React from "react";
import { ContentContainer } from "../../components/global";
import { CreatePost } from "../../components/Home";
import { useAppSelector } from "../../hooks/reduxHook";
import "./home.scss";

const Home = () => {
  const { userState } = useAppSelector((state) => state);

  return (
    <div className="h__main-container">
      <ContentContainer>
        <section>
          <CreatePost
            userId={userState.userData?.id!}
            imageUrl={userState.userData?.Profile?.profileImage!}
            firstName={userState.userData?.first_name!}
          />
        </section>
        <section>
          <h1>Side</h1>
        </section>
      </ContentContainer>
    </div>
  );
};

export default Home;
