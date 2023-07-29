import { connect } from '@planetscale/database'

const config = {
  host: 'aws.connect.psdb.cloud',
  username: 'qn2xqsz7o904762y243n',
  password: 'pscale_pw_JTKBi0WutejVYqjifi7kIwYcO3dF1MZToD4QgRx1zRs',
}


export default async function executeQuery({ query, values }) {
  try {
    const conn = await connect(config)
    const results = await conn.execute(query, values)
    return results
  }  catch (error) {
    console.log(error)
  }
}