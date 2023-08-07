import { m } from "framer-motion"
import { executeQuery } from "../../../config/db"

export default async function handler(req, res) {
  const {
    query: { profileId },
    method,
  } = req

  switch (method) {
    case 'GET':
      const result = await executeQuery({
        query: "SELECT * FROM user WHERE id = ?",
        values: [profileId],
      })
      res.status(200).json(result.rows[0])

      break
    case 'PUT':
      const { firstname, lastname, email, bio, location } = req.body
      
      const updateProfile = await executeQuery({
        query: "UPDATE user SET firstname = ?, lastname = ?, email = ?, bio = ?, location = ? WHERE id = ?",
        values: [firstname, lastname, email, bio, location, profileId],
      })

      res.status(200).json(updateProfile)
  }
}