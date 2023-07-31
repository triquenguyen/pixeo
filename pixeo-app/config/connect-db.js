import { connect } from '@planetscale/database'

const config = {
  host: 'aws.connect.psdb.cloud',
  username: '9c8pwhe5adosvxa23c77',
  password: 'pscale_pw_pzUiVm38GtmHy5W6bcEV1jljMzTooYJJSj34vrJa0vB',
}

export default async function executeQuery({ query, values }) {
  const conn = await connect(config)

  try {
    const results = await conn.execute(query, values)
    return results
  }  catch (error) {
    console.log(error)
  }
}