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


  // =========================
  // FETCH POSTS
  // =========================
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


  // =========================
  // LOAD POSTS
  // =========================
  useEffect(() => {

    const loadPosts = async () => {

      await fetchPosts();
    };

    loadPosts();

  }, []);


  return (

    <div>

      <Navbar />


      <div className="home-container">

        <CreatePost
          refreshPosts={fetchPosts}
        />


        {loading ? (

          <p>
            Loading...
          </p>

        ) : posts.length > 0 ? (

          posts.map((post) => (

            <PostCard
              key={post._id}
              post={post}
            />

          ))

        ) : (

          <p className="no-posts">

            No Posts Found

          </p>

        )}

      </div>

    </div>
  );
};

export default Home; 