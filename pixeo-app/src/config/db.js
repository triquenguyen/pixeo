import { connect } from "@planetscale/database";

const config = {
  username: 'azq0tpusnbtnfkute8n8',
  host: 'aws.connect.psdb.cloud',
  password: 'pscale_pw_Icnr53ux6lralkNNZn5X206oxX6hmucD3ywCOGcKROH'
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
