import React from 'react'
import { authService, firebaseInstance } from 'firebase.config'
import AuthForm from 'components/AuthForm'
import {
  faTwitter,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Auth = () => {

  const onSocialClick = async event => {
    const {
      target: { name },
    } = event
    let provider
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider()
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider()
    }
    const data = await authService.signInWithPopup(provider)
  }

  return (
    <div className='authContainer'>
      <FontAwesomeIcon
        icon={faTwitter}
        color={'#04AAFF'}
        size='3x'
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className='authBtns'>
        <div><button onClick={onSocialClick} name='google' className='authBtn'>Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
        </div>
        <div>
          <button onClick={onSocialClick} name='github' className='authBtn'>Continue with Github <FontAwesomeIcon icon={faGithub} /></button>
        </div>
      </div>
    </div>
  )
}

export default Auth
