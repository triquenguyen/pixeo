import { connect } from "@planetscale/database";

const config = {
  host: 'aws.connect.psdb.cloud',
  username: '1hky0sb32iwsr57y7u6f',
  password: 'pscale_pw_ChUK0mWLRNGdSFVU8KZzAevkyKXvH70o7Y0PIPApziY',
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
