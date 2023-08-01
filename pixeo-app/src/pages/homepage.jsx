import { useSession, signOut, getSession, GetSessionParams } from 'next-auth/react';

export default function HomePage() {

  const { data: session, status } = useSession()

  const handleSignout = () => {
    signOut({ redirect: true, callbackUrl: '/' })
  }


  if (!session) {
    return (
      <h1>You gotta login {status}</h1>
    )
  }

  return (
    <div>
      <h1>This is the Homepage</h1>
      <button onClick={handleSignout}>Sign Out</button>
    </div>

  )
}

HomePage.auth = true