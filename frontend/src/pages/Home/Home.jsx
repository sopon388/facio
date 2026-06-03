import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/CreatePost/CreatePost";
import PostCard from "../../components/PostCard/PostCard";

import { getPosts } from "../../services/postService";

import "./Home.css";

const Home = () => {

  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchPosts = async () => {

    try {

      const data =
        await getPosts();

      setPosts(data.posts);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchPosts();

  }, []);

  return (

    <div className="home-page">

      <Navbar />

      <div className="mobile-container">

        <div className="feed-header">

          <h2>
            News Feed
          </h2>

          <span>
            {posts.length} Posts
          </span>

        </div>

        <CreatePost
          refreshPosts={fetchPosts}
        />

        {loading ? (

          <div className="loading">
            Loading...
          </div>

        ) : posts.length > 0 ? (

          posts.map((post) => (

            <PostCard
              key={post._id}
              post={post}
            />

          ))

        ) : (

          <div className="empty-feed">

            No Posts Found

          </div>

        )}

      </div>

    </div>
  );
};

export default Home;