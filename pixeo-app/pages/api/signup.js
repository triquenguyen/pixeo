import { hash } from 'bcrypt';
import executeQuery from '../../config/connect-db';
// import checkUser from '../../libs/checkUser';

export default async function handler(req, res) {

  const { firstName, lastName, email, password, confirmPass } = await req.body;

  if (!firstName || !lastName || !email || !password || !confirmPass) {
    return res.status(400).json({ message: "Please fill in all fields" })
  }

  // const results = await checkUser(email);
  // if (Number(results.size.length) > 0) {
  //   return res.status(400).json({ message: "User already exists" })
  // } 

  if (password !== confirmPass) {
    return res.status(400).json({ message: "Passwords don't match" })
  }

  const hashedPassword = await hash(password, 10);

  try {
    const results = await executeQuery({
      query: 'INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)',
      values: [firstName, lastName, email, hashedPassword]
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json(error);
  }
}