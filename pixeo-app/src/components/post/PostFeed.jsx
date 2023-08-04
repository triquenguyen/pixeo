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

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} firstName={firstName} lastName={lastName} />
      ))}
    </div>
  )
}