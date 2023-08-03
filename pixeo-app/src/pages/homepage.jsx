import { useSession, signOut, getSession, GetSessionParams } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { executeQuery } from '../config/db';
import Image from 'next/image';

import { useDispatch, useSelector } from 'react-redux';
import { setShowAddPost } from '../redux/showAddPostSlice';

import Navbar from '../components/util/Navbar';
import AddPost from '../components/post/AddPost';
import axios from 'axios';

export default function HomePage({ firstName, lastName }) {
  const showAddPost = useSelector((state) => state.showAddPost.showAddPost);

  const dispatch = useDispatch();
  const closeAddPost = () => { dispatch(setShowAddPost(false)) }

  const [posts, setPosts] = useState([])
  const [preview, setPreview] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/api/posts')
      setPosts(res.data.rows)
    }

    if (loading) {
      fetchPosts()

      for (let i = 0; i < posts.length; i++) {
        posts[i].photo = URL.createObjectURL(posts[i].photo)
        console.log(posts[i].photo)
      }
    }

    console.log(posts)

    return () => {
      setLoading(false)
    }
  }, [posts, loading])

  const { data: session, status } = useSession()

  const handleSignout = () => {
    signOut({ redirect: true, callbackUrl: '/' })
  }

  if (!session) {
    return (
      <h1>You gotta login {status}</h1>
    )
  }

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div className="px-24 py-4">
      <Navbar firstName={firstName} lastName={lastName} />
      <h1>This is the Homepage</h1>
      <button onClick={handleSignout}>Sign Out</button>

      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <Image src={post.photo} width={500} height={500} />
          </div>
        ))}
      </div>

      {showAddPost && <AddPost showAddPost={showAddPost} handleClose={closeAddPost} id={session.user.id} />}
    </div>
  )
}

HomePage.auth = true

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      props: {
        firstName: null,
        lastName: null
      }
    }
  }

  const results = await executeQuery({
    query: 'SELECT * FROM user WHERE email = ?',
    values: [session.user.email]
  })

  return {
    props: {
      firstName: results.rows[0].firstname,
      lastName: results.rows[0].lastname
    }
  }
}