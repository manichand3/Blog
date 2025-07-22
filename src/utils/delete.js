export default function handleDelete(index, posts) {
  return posts.filter((post, postIndex) => index !== postIndex);
}
