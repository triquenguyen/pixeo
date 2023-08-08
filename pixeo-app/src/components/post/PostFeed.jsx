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

      // for (let i = 0; i < posts.length; i++) {
      //   const photoData = posts[i].post_photo; 
      //   const blobData = new Blob([photoData], { type: 'image/jpeg' }); 
      //   const reader = new FileReader();
      //   reader.readAsDataURL(blobData);
      //   reader.onload = () => {
      //     post[i].post_photo = result.reader
      //   };
      //   console.log(posts[i].post_photo)
      // }

      for (let i = 0; i < posts.length; i++) {
        const imgURL = URL.createObjectURL(posts[i].post_photo)
        posts[i].post_photo = imgURL
        console.log(posts[i].post_photo)
      }

    }

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
      {posts.map((post,index) => (
        <PostCard key={post.post_id} post={post} firstName={post.firstname} lastName={post.lastname} />
      ))}
    </div>
  )
}