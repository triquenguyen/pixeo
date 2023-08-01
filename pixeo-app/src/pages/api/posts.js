import { executeQuery } from "../../config/db";

export default async function handler(req, res) {
  const { title, body, userId, photo } = req.body;

  // if (!title || !body || !userId || !photo) {
  //   return res.status(400).json({ message: "Please fill in all fields" });
  // }

  switch (req.body) {
    case !title:
      return res.status(400).json({ message: "Please fill in title" });
    case !body:
      return res.status(400).json({ message: "Please fill in body" });
    case !userId:
      return res.status(400).json({ message: "Please fill in userId" });
    case !photo:
      return res.status(400).json({ message: "Please fill in photo" });
  }

  try {
    const newPost = await executeQuery({
      query:
        "INSERT INTO post (title, body, photo, user_id) VALUES (?, ?, ?, ?)",
      values: [String(title), String(body), String(photo), Number(userId)],
    })
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }

}