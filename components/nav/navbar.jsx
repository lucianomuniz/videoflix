import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { logout, isLoggedIn } from '../../lib/magic-client';

import styles from './navbar.module.css';

const NavBar = (props) => {
  const { username } = props;
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push('/');
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push('/browse/my-list');
  };

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await logout();
      console.log('logged?', await isLoggedIn());
      router.push('/login');
    } catch (e) {
      console.log('Error logging out');
      router.push('/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href='/' passHref legacyBehavior>
          <div className={styles.logoWrapper}>
            <Image
              src='/static/netflix.svg'
              alt='netflix logo'
              width='138'
              height='34'
            />
          </div>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              <Image
                src={
                  showDropdown
                    ? '/static/expand_less.svg'
                    : '/static/expand_more.svg'
                }
                alt='expand dropdown icon'
                width='24'
                height='24'
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignOut}>
                    Sign out
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
