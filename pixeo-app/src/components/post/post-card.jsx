import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { executeQuery } from "@/config/db";

export default function PostCard({ post }) {
  const { data: session } = useSession();
  const [isInterested, setIsInterested] = useState(false);
  const [interests, setInterests] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isYourPost, setIsYourPost] = useState(false);

  useEffect(() => {
    const fetchInterests = async () => {
      await executeQuery({
        query: `SELECT * FROM interest WHERE user_id = ?`,
        values: [session.user.id],
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
        query: `SELECT * FROM follow WHERE follower_id = ?`,
        values: [session.user.id],
      });

      for (let i = 0; i < results.rows.length; i++)
        if (
          results.rows[i].follower_id === session.user.id &&
          results.rows[i].following_id === post.user_id
        )
          setIsFollowing(true);
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
    setIsInterested(true);
    const results = await executeQuery({
      query: `INSERT INTO interest (post_id, user_id) VALUES (?, ?)`,
      values: [post.post_id, session.user.id],
    });
  };

  const handleUnInterest = async (e) => {
    e.preventDefault();
    setIsInterested(false);
    const results = await executeQuery({
      query: `DELETE FROM interest WHERE post_id = ? AND user_id = ?`,
      values: [post.post_id, session.user.id],
    });
  };

  const handleFollow = async (e) => {
    e.preventDefault();
    setIsFollowing(true);
    const results = await executeQuery({
      query: `INSERT INTO follow (follower_id, following_id) VALUES (?, ?)`,
      values: [session.user.id, post.user_id],
    });
  };

  const handleUnfollow = async (e) => {
    e.preventDefault();
    setIsFollowing(false);
    const results = await executeQuery({
      query: `DELETE FROM follow WHERE follower_id = ? AND following_id = ?`,
      values: [session.user.id, post.user_id],
    });
  };

  return (
    <div className="w-full max-w-xl rounded-xl border border-gray-200 shadow-xl">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image alt="" height={50} src="../../user-circle.svg" width={30} />
            <h1>
              {post.firstname} {post.lastname}
            </h1>
          </div>
          <div>
            {!isYourPost &&
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
        <div className="flex flex-col items-center">
          <img alt="" height={500} src={post.post_photo} width={500} />
        </div>
        <div className="flex items-center justify-between p-4 border-t-2 ">
          <div>
            <h1 className="font-bold">{post.title}</h1>
            <p className="text-gray-500">{post.body}</p>
          </div>
          <div>
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
