import styles from './styles.module.scss';

import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

export function SignInButton() {
  const isUserLoggedIn = false;

  return (
    <button 
      type="button" 
      className={styles.signInButton}
    >
      <FaGithub color={isUserLoggedIn ? "#04D361" : "#EBA417"} />
      {
        isUserLoggedIn ? (
          <> 
            Agustinho Neto 
            <FiX color="#737380" className={styles.closeIcon} />
          </>
        ) : "Sign in with GitHub"
      }
    </button>
  )
}