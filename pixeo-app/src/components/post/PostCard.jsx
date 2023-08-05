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

  const handleClick = async () => {
    const results = await executeQuery({
      query: `SELECT * FROM interest WHERE user_id = ?`,
      values: [session.user.id]
    })
    console.log(results.rows)
  }

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


  return (
    <div className="border-2 w-[640px] rounded-xl border-black">
      <div className="p-4 border-b-2">
        <div className="flex items-center gap-2">
          <Image src="../../user-circle.svg" width={30} height={50} alt="User Photo" />
          <h1>{firstName} {lastName}</h1>
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