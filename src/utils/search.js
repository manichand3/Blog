export default function handleSearch(inputText, posts) {
  const trimmed = inputText.trim().toLowerCase();
  return posts.filter((post) => post.title.toLowerCase().includes(trimmed));
}
