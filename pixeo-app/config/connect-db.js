import { connect } from '@planetscale/database'

const config = {

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