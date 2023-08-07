import Image from "next/image"
import { useSession } from "next-auth/react"
import { executeQuery } from "../../config/db"
import { useEffect, useState } from "react"
import axios from 'axios'

export default function PostCard({ post, firstName, lastName }) {
  const { data: session, status } = useSession()
  const [isInterested, setIsInterested] = useState(false)
  const [interests, setInterests] = useState([])
  const [interestCount, setInterestCount] = useState(0)
  const [follows, setFollows] = useState([])
  const [isFollowing, setIsFollowing] = useState(false)
  const [isYourPost, setIsYourPost] = useState(false)

  useEffect(() => {
    const fetchInterests = async () => {
      const results = await executeQuery({
        query: `SELECT * FROM interest WHERE user_id = ?`,
        values: [session.user.id]
      })
      setInterests(results.rows)

      for (let i = 0; i < results.rows.length; i++) {
        if (results.rows[i].post_id === post.id && results.rows[i].user_id === session.user.id) {
          setIsInterested(true)
        }
      }
    }
    fetchInterests()

    const fetchFollows = async () => {
      const results = await executeQuery({
        query: `SELECT * FROM follow WHERE follower_id = ?`,
        values: [session.user.id]
      })
      setFollows(results.rows)

      for (let i = 0; i < results.rows.length; i++) {
        if (results.rows[i].follower_id === session.user.id && session.user.id === post.user_id) {
          setIsYourPost(true)
        }
        if (results.rows[i].follower_id === session.user.id && results.rows[i].following_id === post.user_id) {
          setIsFollowing(true)
        }
      }
    }

    fetchFollows()
  }, [])

  useEffect(() => {
    const countInterests = () => {
      let count = 0
      for (let i = 0; i < interests.length; i++) {
        if (interests[i].post_id === post.id) {
          count++
        }
      }
      setInterestCount(count)
    }
    countInterests()
  }, [interests])

  const handleInterest = async (e) => {
    e.preventDefault()
    setIsInterested(true)
    const results = await executeQuery({
      query: `INSERT INTO interest (post_id, user_id) VALUES (?, ?)`,
      values: [post.id, session.user.id,]
    })
  }

  const handleUnInterest = async (e) => {
    e.preventDefault()
    const results = await executeQuery({
      query: `DELETE FROM interest WHERE post_id = ? AND user_id = ?`,
      values: [post.id, session.user.id]
    })
    setIsInterested(false)
  }

  const handleFollow = async (e) => {
    e.preventDefault()
    setIsFollowing(true)
    const results = await executeQuery({
      query: `INSERT INTO follow (follower_id, following_id) VALUES (?, ?)`,
      values: [session.user.id, post.user_id]
    })
  }

  const handleUnfollow = async (e) => {
    e.preventDefault()
    setIsFollowing(false)
    const results = await executeQuery({
      query: `DELETE FROM follow WHERE follower_id = ? AND following_id = ?`,
      values: [session.user.id, post.user_id]
    })
  }


  return (
    <div className="border-2 w-[640px] rounded-xl border-black">
      <div className="p-4 border-b-2">
        <div className="flex">
          <div className="mr-auto flex items-center gap-2">
            <Image src="../../user-circle.svg" width={30} height={50} alt="User Photo" />
            <h1>{firstName} {lastName}</h1>
          </div>
          <div>
            {!isYourPost ? (
              isFollowing ? (
                <button onClick={handleUnfollow}>
                  <Image src="/added.png" width={25} height={25} />
                </button>
              ) : (
                <button onClick={handleFollow}>
                  <Image src="/add.png" width={25} height={25} />
                </button>
              )
            ) : (<></>)}
            
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center">
          <Image src="/image.png" width={500} height={500} />
        </div>
        <div className="flex items-center p-4 border-t-2 ">
          <div className="mr-auto">
            <h1 className="font-bold">{post.title}</h1>
            <p>{post.body}</p>
          </div>
          <div>
            {isInterested ? (
              <button onClick={handleUnInterest}>
                <Image src="/interested.png" width={25} height={25} />
                <span>{interestCount}</span>
              </button>
            ) : (
              <button onClick={handleInterest}>
                <Image src="/interest.png" width={25} height={25} />
                <span>{interestCount}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}