import executeQuery from "@/config/connect-db";

const findUser = async (email) => {
  const results = await executeQuery({
    query: "SELECT * FROM user WHERE email = ?",
    values: [String(email)],
  });

  return results;
};

export default findUser;
