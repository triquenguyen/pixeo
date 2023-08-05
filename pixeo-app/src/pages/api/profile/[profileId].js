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
        values: [6],
      })
      res.status(200).json(result.rows[0])

      break
    case 'PUT':
      // Update or create data in your database
      res.status(200).json({ profileId, name: name || `User ${profileId}` })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}