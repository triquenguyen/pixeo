import { executeQuery } from "@/config/db";

export const findByEmail = async (email) => {
  return executeQuery({
    query: "SELECT * FROM user WHERE email = ?",
    values: [String(email)],
  });
};

export const getAllPosts = async () => {
  return executeQuery({
    query: `SELECT post.id AS post_id, post.title, post.body, post.photo AS post_photo,
                user.id AS user_id, user.firstname, user.lastname, user.email, user.photo AS user_photo
                FROM post
                JOIN user ON post.user_id = user.id
                ORDER BY post.id DESC;`,
    values: [],
  });
};

export const addPost = async ({ title, body, userId, photo }) => {
  return executeQuery({
    query: "INSERT INTO post (title, body, photo, user_id) VALUES (?, ?, ?, ?)",
    values: [String(title), String(body), photo, Number(userId)],
  });
};
