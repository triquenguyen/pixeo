import { executeQuery } from "@/config/db";

const handleGET = async (req, res) => {
  const result = await executeQuery({
    query: "SELECT * FROM user WHERE id = ?",
    values: [req.query.profileId],
  });

  res.status(200).json(result.rows[0]);
};

const handlePUT = async (req, res) => {
  const { firstname, lastname, email, bio, location, photo } = req.body;

  const updateProfile = await executeQuery({
    query:
      "UPDATE user SET firstname = ?, lastname = ?, email = ?, bio = ?, location = ?, profile_photo = ? WHERE id = ?",
    values: [
      firstname,
      lastname,
      email,
      bio,
      location,
      photo,
      req.query.profileId,
    ],
  });

  res.status(200).json(updateProfile);
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return handleGET(req, res);
    case "PUT":
      return handlePUT(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
