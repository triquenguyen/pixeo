import { connect } from "@planetscale/database";

const config = {
  host: "aws.connect.psdb.cloud",
  username: "x73idwwo2tr8fayb2eek",
  password: "pscale_pw_20vKl16bD82CFzD1zVIUf8D9HKVYbTTcAtQsZHb5LuA",
};

export async function executeQuery({ query, values }) {
  const conn = await connect(config);

  try {
    const results = await conn.execute(query, values);
    return results;
  } catch (error) {
    console.log(error);
  }
}
