import mysql from "serverless-mysql";

<<<<<<< HEAD
const config = {
  username: 'azq0tpusnbtnfkute8n8',
  host: 'aws.connect.psdb.cloud',
  password: 'pscale_pw_Icnr53ux6lralkNNZn5X206oxX6hmucD3ywCOGcKROH'
};
=======
const db = mysql({
  config: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    insecureAuth: true,
  },
});
>>>>>>> dad4d3f4048063d9313a3c5aa97fd696af3193ee

export async function executeQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}

export default db;
