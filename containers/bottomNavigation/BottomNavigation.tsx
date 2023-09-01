'use client';

import Link from 'next/link';
import styles from './BottomNavigation.module.scss';
import { FaComments, FaUserPlus } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const BottomNavigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className={styles.bottomNavigation}>
      <Link
        href="/home/chats"
        // style={pathname === '/home/chats' ? { color: 'red' } : undefined}
        style={
          pathname === '/home/chats'
            ? { color: 'var(--primary-color)' }
            : undefined
        }
      >
        <FaComments />
      </Link>

      <Link
        href="/home/find"
        // style={pathname === '/home/find' ? { color: 'red' } : undefined}
        style={
          pathname === '/home/find'
            ? { color: 'var(--primary-color)' }
            : undefined
        }
      >
        <FaUserPlus />
      </Link>
    </div>
  );
};

export default BottomNavigation;
