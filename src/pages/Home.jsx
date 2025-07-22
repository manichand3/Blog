import { useState } from "react";
const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  console.log(title);
  function handlePost() {
    const newPost = { title, content };
    setPosts([...posts, newPost]);
    setContent(" ");
    setTitle(" ");
    console.log(posts);
  }
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
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <input
              className="bg-amber-200 p-4 rounded-md"
              placeholder="Content"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></input>
          </div>
        </div>
      )}
      {posts.map((post, index) => {
        return (
          <div key={index}>
            <p>{post.title}</p>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Home;
