import { useState, useEffect } from "react";
import handleSearch from "../utils/search";
import handleDelete from "../utils/delete";
import PostUI from "../components/PostUI.jsx";
const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("user-posts");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filterPosts, setFilterPosts] = useState([]);
  const [editToggle, setEditToggle] = useState(undefined);
  console.log(editToggle);
  // console.log(editPost);
  useEffect(() => {
    if (editToggle !== undefined && posts[editToggle]) {
      const editPost = posts[editToggle];
      setTitle(editPost.title);
      setContent(editPost.content);
      setShowForm(true); // 👈 Optional: auto open the form on edit
    }
  }, [editToggle]);

  function handlePost() {
    const newPost = { title, content };
    if (title.trim().length > 0 && content.trim().length > 0) {
      if (editToggle !== undefined) {
        // Editing existing post
        const updatedPosts = posts.map((post, i) => {
          if (editToggle === i) {
            return newPost; // Replace with updated content
          } else {
            return post; // Keep others as-is
          }
        });
        setPosts(updatedPosts);
        setEditToggle(undefined); // Reset edit state
      } else {
        // Adding new post
        setPosts([...posts, newPost]);
      }

      setContent("");
      setTitle("");
      setShowForm(!showForm); // Optional: close form after post
    } else {
      alert("Please complete the fields");
    }
  }

  useEffect(() => {
    const postsJson = JSON.stringify(posts);
    localStorage.setItem("user-posts", postsJson);
  }, [posts]);

  return (
    <div>
      <div className="flex text-amber-950 font-bold text-3xl bg-black p-5 rounded-md justify-center">
        <p className="font-sans bg-black text-amber-50">My Mini Blog</p>
      </div>
      <div className="flex justify-around m-6">
        <div>
          <button
            onClick={() => {
              setShowForm(!showForm);
            }}
            className="bg-blue-400 rounded-md p-3 cursor-pointer"
          >
            New Post
          </button>
        </div>
        <div>
          <input
            className="bg-blue-400 rounded-md  p-3"
            placeholder="Search Posts by title"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              const searchedPosts = handleSearch(e.target.value, posts);
              setFilterPosts(searchedPosts);
            }}
          ></input>
        </div>
      </div>
      {showForm && (
        <div className="flex flex-col-reverse justify-center items-center gap-4">
          <div className="mt-5">
            <button
              onClick={() => {
                handlePost();
              }}
              className="bg-black p-2 text-amber-50 rounded-md"
            >
              post
            </button>
            <button
              onClick={() => {
                setShowForm(!showForm);
              }}
              className="bg-black p-2 ml-4 text-amber-50 rounded-md"
            >
              Cancal
            </button>
          </div>
          <div>
            <input
              className="bg-amber-200 p-4 rounded-md mb-4"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <input
              className="bg-amber-200 p-4 rounded-md"
              placeholder="Content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></input>
          </div>
        </div>
      )}
      {(searchInput ? filterPosts : posts).map((post, index) => {
        return (
          <PostUI
            key={index}
            post={post}
            index={index}
            setEditToggle={setEditToggle}
            onDelete={(i) => {
              const updated = handleDelete(i, posts);
              setPosts(updated);
            }}
          />
        );
      })}
    </div>
  );
};
export default Home;
