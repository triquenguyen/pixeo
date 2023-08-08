import { addPost, getAllPosts } from "@/lib/user";

const handlePOST = async (req, res) => {
  const { title, body, userId, photo } = req.body;

  if (!title || !body || !userId || !photo)
    return res.status(400).json({ message: "Please fill in all fields" });

  try {
    const newPost = await addPost({
      title,
      body,
      userId,
      photo,
    });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

const handleGET = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return handlePOST(req, res);
    case "GET":
      return handleGET(req, res);
  }
}
