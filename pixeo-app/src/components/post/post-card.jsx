import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { executeQuery } from "@/config/db";

export default function PostCard({ post }) {
  const { data: session } = useSession();
  const [isInterested, setIsInterested] = useState(false);
  const [interests, setInterests] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchInterests = async () => {
      await executeQuery({
        query: `SELECT * FROM interest WHERE user_id = ? AND post_id = ?`,
        values: [session.user.id, post.post_id],
      }).then((results) => {
        if (results.rows.length > 0) setIsInterested(true);
      });

      await executeQuery({
        query: `SELECT * FROM interest WHERE post_id = ?`,
        values: [post.post_id],
      }).then((results) => {
        setInterests(results.rows);
      });
    };
    fetchInterests();
  }, [post.post_id, post.user_id, session.user.id, isInterested]);

  useEffect(() => {
    const fetchFollows = async () => {
      const results = await executeQuery({
        query: `SELECT * FROM follow WHERE follower_id = ? AND following_id = ?`,
        values: [session.user.id, post.user_id],
      });

      if (results.rows.length > 0) setIsFollowing(true);
    };

    fetchFollows();
  }, [post.user_id, session.user.id, isFollowing]);

  const interestCount = useMemo(
    () =>
      interests.reduce((acc, interest) => {
        if (interest.post_id === post.post_id) acc++;
        return acc;
      }, 0),
    [interests, post.post_id],
  );

  const handleInterest = async (e) => {
    e.preventDefault();
    await executeQuery({
      query: `INSERT INTO interest (post_id, user_id) VALUES (?, ?)`,
      values: [post.post_id, session.user.id],
    });
    setIsInterested(true);
  };

  const handleUnInterest = async (e) => {
    e.preventDefault();
    await executeQuery({
      query: `DELETE FROM interest WHERE post_id = ? AND user_id = ?`,
      values: [post.post_id, session.user.id],
    });
    setIsInterested(false);
  };

  const handleFollow = async (e) => {
    e.preventDefault();
    await executeQuery({
      query: `INSERT INTO follow (follower_id, following_id) VALUES (?, ?)`,
      values: [session.user.id, post.user_id],
    });
    setIsFollowing(true);
  };

  const handleUnfollow = async (e) => {
    e.preventDefault();
    await executeQuery({
      query: `DELETE FROM follow WHERE follower_id = ? AND following_id = ?`,
      values: [session.user.id, post.user_id],
    });
    setIsFollowing(false);
  };

  return (
    <div className="w-full max-w-xl rounded-xl border border-gray-200 shadow-xl">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              alt=""
              className="rounded-full w-8 h-8"
              height={32}
              src={post.user_photo || "/user-circle.svg"}
              width={32}
            />
            <h1>
              {post.firstname} {post.lastname}
            </h1>
          </div>
          <div>
            {post.user_id !== session.user.id &&
              (isFollowing ? (
                <button onClick={handleUnfollow}>
                  <Image
                    alt="Unfollow"
                    height={25}
                    src="/added.png"
                    width={25}
                  />
                </button>
              ) : (
                <button onClick={handleFollow}>
                  <Image alt="Follow" height={25} src="/add.png" width={25} />
                </button>
              ))}
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center w-full">
          <Image
            alt=""
            height={400}
            objectPosition="center"
            src={post.post_photo}
            width={400}
          />
        </div>
        <div className="flex items-center justify-between p-4 border-t space-x-2">
          <div>
            <h1 className="font-bold">{post.title}</h1>
            <p className="text-gray-500">{post.body}</p>
          </div>
          <div className="shrink-0">
            {isInterested ? (
              <button onClick={handleUnInterest}>
                <Image
                  alt="# Interested: "
                  height={25}
                  src="/interested.png"
                  width={25}
                />
                <span>{interestCount}</span>
              </button>
            ) : (
              <button onClick={handleInterest}>
                <Image
                  alt="# Interested:"
                  height={25}
                  src="/interest.png"
                  width={25}
                />
                <span>{interestCount}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
