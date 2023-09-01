import { auth } from '@/config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  resetAllForms,
  setLoginEmailError,
  setLoginPasswordError,
} from '@/redux/slices/signInSlice';
import { useRouter } from 'next/navigation';
import { setCurrentUser } from '@/redux/slices/authSlice';

export const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string | any>(null);

  const mutate = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);

    const { email, password } = credentials;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // NAVIGATES TO CHATS PAGE UPON LOGIN
      dispatch(
        setCurrentUser({
          isLoading: false,
          active: true,
        })
      );

      router.push('/home/chats');

      dispatch(resetAllForms());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
      // @ts-ignore
      console.log(error.message);
      // ALERT ERROR HERE
      // @ts-ignore
      if (error.message === 'Firebase: Error (auth/wrong-password).') {
        dispatch(setLoginPasswordError('Incorrect password'));
        // @ts-ignore
      } else if (error.message === 'Firebase: Error (auth/user-not-found).') {
        dispatch(setLoginEmailError('No account with this email'));
      } else if (
        // @ts-ignore
        error.message === 'Firebase: Error (auth/network-request-failed).'
      ) {
        alert('Network request failed. Please check your internet connection');
      }
    }
  };

  return { mutate, isLoading, error };
};
