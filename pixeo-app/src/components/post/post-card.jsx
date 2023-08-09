import Image from "next/image";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import axios from "axios";

export default function PostCard({ post, mutate }) {
  const { data: session } = useSession();

  const likeId = useMemo(() => {
    const index =
      post.liked_by?.split(",").indexOf(String(session.user.id)) ?? -1;
    return index !== -1 ? post.like_ids.split(",")[index] : null;
  }, [post.liked_by, session.user.id]);
  const followId = useMemo(() => {
    const index =
      post.followed_by?.split(",").indexOf(String(session.user.id)) ?? -1;
    return index !== -1 ? post.follow_ids.split(",")[index] : null;
  }, [post.followed_by, session.user.id]);

  const handleInteract = useCallback(() => {
    (likeId
      ? axios.delete(`/api/interaction/${likeId}`)
      : axios.post(`/api/interaction`, {
          user_id: session.user.id,
          post_id: post.id,
          type: "like",
        })
    ).then(() => mutate());
  }, [likeId, post.id, session.user.id]);

  const handleFollow = useCallback(() => {
    (followId
      ? axios.delete(`/api/follow/${followId}`)
      : axios.post(`/api/follow`, {
          follower_id: session.user.id,
          following_id: post.user_id,
        })
    ).then(() => mutate());
  }, [followId, post.user_id, session.user.id]);

  return (
    <div className="w-full max-w-xl rounded-xl border border-gray-200 shadow-xl">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              alt=""
              className="rounded-full w-8 h-8"
              height={32}
              src={
                post.user_photo_id
                  ? `/api/photo/${post.user_photo_id}`
                  : "/user-circle.svg"
              }
              width={32}
            />
            {post.user_id === session.user.id ? (
              <h1 className="font-medium text-blue-700">You</h1>
            ) : (
              <h1>{post.full_name}</h1>
            )}
          </div>
          {post.user_id !== session.user.id && (
            <div className="flex space-x-2 items-center">
              <span>{post.followers}</span>
              <button onClick={handleFollow}>
                <Image
                  alt={followId ? "Unfollow" : "Follow"}
                  height={25}
                  src={followId ? "/added.png" : "/add.png"}
                  width={25}
                />
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center w-full">
          <Image
            alt=""
            height={400}
            objectPosition="center"
            src={`/api/photo/${post.photo_id}`}
            width={400}
          />
        </div>
        <div className="flex items-center justify-between p-4 border-t space-x-2">
          <div>
            <h1 className="font-bold">{post.title}</h1>
            <p className="text-gray-500">{post.body}</p>
          </div>
          <div className="shrink-0">
            <button onClick={handleInteract}>
              <Image
                alt="# Interested:"
                height={25}
                src={likeId ? "/interested.png" : "/interest.png"}
                width={25}
              />
              <span>{post.likes}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
