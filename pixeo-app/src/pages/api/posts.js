import { executeQuery } from "../../config/db";
import { addPost, getAllPosts } from "../../lib/user";

export default async function handler(req, res) {

  if (req.method == "POST") {
    const { title, body, userId, photo } = req.body;

    if (!title || !body || !userId || !photo) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    try {
      const newPost = await addPost({ title, body, userId, photo });
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method == "GET") {
    try {
      const posts = await getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ message: "Method is not supported" });
  }
}