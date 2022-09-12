import React from "react";
import { ContentContainer } from "../../components/global";
import { CreatePost } from "../../components/Home";
import "./home.scss";

const Home = () => {
  return (
    <div className="h__main-container">
      <ContentContainer>
        <section>
          <h1>Home</h1>
          <CreatePost />
        </section>
        <section>
          <h1>Side</h1>
        </section>
      </ContentContainer>
    </div>
  );
};

export default Home;
