import { useState, useEffect } from "react";
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
  console.log(title);
  function handlePost() {
    const newPost = { title, content };
    if (title.trim().length > 0 && content.trim().length > 0) {
      setPosts([...posts, newPost]);
      setContent("");
      setTitle("");
      console.log(posts);
    } else {
      alert("please complete the fields");
    }
  }

  //handleSearch

  function handleSearch(input) {
    setSearchInput(input);
    console.log(searchInput);
    const searchedPosts = posts.filter((post, index) => {
      return post.title.toLowerCase().includes(input.toLowerCase());
    });
    setFilterPosts(searchedPosts);
  }

  //localStorage
  useEffect(() => {
    const postsJson = JSON.stringify(posts);
    localStorage.setItem("user-posts", postsJson);
  }, [posts]);
  // useEffect(() => {
  //   const saved = localStorage.getItem("user-posts");
  //   if (saved) {
  //     setPosts(JSON.parse(saved));
  //   }
  //   console.log("Loaded from localStorage:", saved);
  const displayedPosts = searchInput
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(searchInput.toLowerCase())
      )
    : posts;

  // }, []);

  return (
    <div>
      <div className="flex text-amber-950 font-bold text-3xl">
        <p className="font-sans">My Mini Blog</p>
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
              handleSearch(e.target.value);
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
          <div key={index}>
            <div className="bg-cyan-700 m-2 rounded-md p-10 hover:bg-cyan-600 break-words w-[300px]">
              <p className="p-2 font-bold text-blue-50 text-2xl">
                Title:---{post.title}
              </p>
              <p className="p-2 text-xl break-words w-[300px]">
                content:---{post.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Home;
