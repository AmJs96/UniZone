import React from "react";
import { Sidebar } from "../Components/Sidebar";
import Post from "../Components/Post";
import Widgets from "../Components/Widgets";
import Layout from "../Components/Layout";

import "./Home.css";
function Home() {
  return (
    <Layout>
    <div className="Home">
      <div className="Home__body">
        <Sidebar />
        <Post />
        {/* <Widgets /> */}
      </div>
    </div>
    </Layout>
  );
}

export default Home;
