function PostUI({ post, index, onDelete }) {
  return (
    <div className="flex justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-6 m-4 w-full max-w-md border border-gray-200 transition-transform hover:scale-105">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          📝 {post.title}
        </h2>
        <p className="text-gray-600 mb-4 whitespace-pre-wrap break-words">
          {post.content}
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm"
            onClick={() => onDelete(index)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostUI;
