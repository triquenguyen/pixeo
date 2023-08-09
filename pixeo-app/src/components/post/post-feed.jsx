import useSWR from "swr";
import PostCard from "./post-card";

export default function PostFeed() {
  const {
    data: posts,
    isLoading,
    mutate,
  } = useSWR("/api/post", (...args) =>
    fetch(...args).then((res) => res.json())
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col mt-8 space-y-8 items-center">
      {(posts?.data || []).map((post) => (
        <PostCard key={post.id} post={post} mutate={mutate} />
      ))}
    </div>
  );
}
