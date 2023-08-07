import { useState, useEffect } from 'react'
import axios from 'axios'
import PostCard from './PostCard'

export default function PostFeed({ firstName, lastName }) {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/api/posts')
      setPosts(res.data.rows)
      console.log(res)
    }

    if (loading) {
      fetchPosts()

      for (let i = 0; i < posts.length; i++) {
        posts[i].post_photo = URL.createObjectURL(posts[i].post_photo)
        console.log(posts[i].post_photo)
      }
    }

    console.log(posts)

    return () => {
      setLoading(false)
    }
  }, [posts, loading])

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div className='flex flex-col space-y-10 items-center'>
      {posts.map((post) => (
        <PostCard key={post.post_id} post={post} firstName={post.firstname} lastName={post.lastname} />
      ))}
    </div>
  )
}