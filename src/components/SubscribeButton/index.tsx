import { signIn, useSession } from 'next-auth/react';
import { useCallback } from 'react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

type SubscribeButtonProps = {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();
  
  const handleSubscribe = useCallback(async () => {
    if (!session) {
      signIn('github');
      return;
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data;

      const stripe = await getStripeJs();
          
      await stripe.redirectToCheckout({ sessionId }); 
    } catch (err) {
      alert(err.message); //react-toastify
    }
  
  }, [session]);
  
  return (
    <button 
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}