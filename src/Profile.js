import React, { useState, useEffect } from 'react';
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import { getCurrentUser } from 'aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css'
import Container from './Container';

const Profile = () => {
  useEffect(() => {
    checkUser()
  }, [])

  const [user, setUser] = useState({})
  
  const checkUser = async() => {
    try {
      const user = await getCurrentUser()
      const userInfo = { username: user.username, ...user.signInDetails }
      setUser(userInfo)
    } catch (err) { console.error('error: ', err) }
  }
  return (
    <Container>
            <Authenticator>
             {({ signOut, user }) => (
                 <main>
                     <h1>Profile</h1>
                     <h2>UserId: {user.username}</h2>
                     <h3>Email: {user.signInDetails.loginId}</h3>
                     <button onClick={signOut}>Sign out</button>
                 </main>
             )}
             </Authenticator>
    </Container>
  );
}

export default withAuthenticator(Profile)