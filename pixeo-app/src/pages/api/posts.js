import { executeQuery } from "../../config/db";

export default async function handler(req, res) {

  if (req.method == "POST") {
    const { title, body, userId, photo } = req.body;

    if (!title || !body || !userId || !photo) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    try {
      const newPost = await executeQuery({
        query:
          "INSERT INTO post (title, body, photo, user_id) VALUES (?, ?, ?, ?)",
        values: [String(title), String(body), photo, Number(userId)],
      })
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method == "GET") {
    try {
      const posts = await executeQuery({
        query: `SELECT post.id AS post_id, post.title, post.body, post.photo AS post_photo,
                user.id AS user_id, user.firstname, user.lastname, user.email
                FROM post
                JOIN user ON post.user_id = user.id;`,
        values: [],
      })
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ message: "Method is not supported" });
  }
}