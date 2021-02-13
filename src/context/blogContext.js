import React, { useState, createContext } from "react";
import ApiService from "../services/api.service";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const getResource = (resource, value) => {
    switch (resource) {
      case "tag":
        return "/articles/tag/" + value
      case "category":
        return "/articles/category/" + value
      default:
        return "/articles"
    }
  }

  const GetPosts = (resource, value) => {
    setLoading(true);
    setError(false);

    ApiService.get(getResource(resource, value) + "?sort=-createdAt")
      .then((res) => {
        setLoading(false);
        setPosts(res.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  const GetPost = (slug) => {
    setLoading(true);
    setError(false);

    ApiService.get("/articles/" + slug)
      .then((res) => {
        setLoading(false);
        setPost(res.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <BlogContext.Provider value={{ GetPosts, GetPost, posts, post, loading, error }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;
