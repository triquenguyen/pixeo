import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPost from "@/components/post/add-post";
import PostFeed from "@/components/post/post-feed";
import Profile from "@/components/user/profile";
import Navbar from "@/components/util/navbar";
import { setShowAddPost } from "@/redux/showAddPostSlice";
import { setShowProfile } from "@/redux/showProfileSlice";

export default function Home() {
  const router = useRouter();
  const showAddPost = useSelector((state) => state.showAddPost);
  const showProfile = useSelector((state) => state.showProfile);

  const dispatch = useDispatch();
  const closeAddPost = () => dispatch(setShowAddPost(false));
  const closeProfile = () => dispatch(setShowProfile(false));

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  if (status !== "authenticated") return <h1>Loading...</h1>;

  return (
    <div className="max-w-3xl mx-auto py-4">
      <Navbar />

      <PostFeed />

      {showAddPost && (
        <AddPost
          handleClose={closeAddPost}
          id={session.user.id}
          showAddPost={showAddPost}
        />
      )}
      {showProfile && (
        <Profile
          handleClose={closeProfile}
          id={session.user.id}
          showProfile={showProfile}
        />
      )}
    </div>
  );
}

Home.auth = true;
