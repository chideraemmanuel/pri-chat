'use client';

import Chat from '@/components/chat/Chat';
import styles from './Chats.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useGetChats } from '@/hooks/useGetChats';
import { FaUserPlus } from 'react-icons/fa';

const Chats: React.FC = () => {
  // const { chats } = useSelector((store: StoreTypes) => store.chat);

  const dispatch = useDispatch();

  const { data: chats, isLoading } = useGetChats();
  // console.log(data);
  // console.log(isLoading);

  return (
    <div className={styles.chats}>
      {isLoading && <p>Loading chats...</p>}

      {!isLoading &&
        chats &&
        chats.length > 0 &&
        chats.map((chat) => <Chat {...chat} />)}

      {!isLoading && chats.length === 0 && (
        <p>
          You don't have any recent chats. Click on{' '}
          <span>
            <FaUserPlus />
          </span>{' '}
          to find users and start a conversation.
        </p>
      )}
    </div>
  );
};

export default Chats;
