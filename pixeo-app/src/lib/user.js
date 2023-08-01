import { executeQuery } from "@/config/db";

export const findByEmail = async (email) => {
  return executeQuery({
    query: "SELECT * FROM user WHERE email = ?",
    values: [String(email)],
  });
};
