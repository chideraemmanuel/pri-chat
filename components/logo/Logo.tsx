import styles from './Logo.module.scss';
import { FaComments } from 'react-icons/fa';
import { Dancing_Script } from 'next/font/google';
import logo from '@/assets/logo.svg';
import Image from 'next/image';
// import logo from '@/assets/logo2.svg'

const dancingScript = Dancing_Script({ subsets: ['latin'] });

const Logo: React.FC = () => {
  return (
    <div className={styles.logo}>
      {/* <FaComments /> */}
      <div className={styles.logo__image}>
        <Image src={logo} alt="logo" />
      </div>
      <span>PriChat</span>
    </div>
  );
};

export default Logo;
