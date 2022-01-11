import styles from './styles.module.scss';

import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';

export function SignInButton() {
  const { data } = useSession();

  return (
    <button 
      type="button" 
      className={styles.signInButton}
      onClick={() => data ? signOut() : signIn('github')}
    >
      <FaGithub color={!data ? "#04D361" : "#EBA417"} />
      {
        data ? (
          <> 
            {data.user.name}
            <FiX color="#737380" className={styles.closeIcon} />
          </>
        ) : "Sign in with GitHub"
      }
    </button>
  )
}