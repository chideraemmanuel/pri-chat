import { auth, db } from '@/config/firebase';
import { setCurrentUser } from '@/redux/slices/authSlice';
import { resetAllForms, setSignUpEmailError } from '@/redux/slices/signInSlice';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

interface UserTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string | any>(null);

  const mutate = async (credentials: UserTypes) => {
    setIsLoading(true);

    const { firstName, lastName, email, password } = credentials;

    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { uid } = createdUser.user;
      const userDocumentReference = doc(db, 'users', uid);

      const data = {
        // id: uid,
        uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        // firstName: firstName.toLocaleLowerCase(),
        // lastName: lastName.toLocaleLowerCase(),
        // email: email.toLocaleLowerCase(),
        // displayName
        // displayPicture: null,
        profileImage: null,
      };

      // CREATES USER DOCUMENT
      // await setDoc(userDocumentReference, data, { merge: true });
      await setDoc(userDocumentReference, data);

      // NAVIGATES TO CHATS PAGE AFTER DOCUMENT HAS BEEN CREATED
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
      // @ts-ignore
      setError(error.message);
      // console.log(error);
      // @ts-ignore
      console.log(error.message);
      // ALERT ERROR HERE
      // @ts-ignore
      if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        console.log('email already in use');
        dispatch(setSignUpEmailError('Email already in use'));
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
