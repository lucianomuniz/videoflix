import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { loginWithEmail } from '../lib/magic-client';

import styles from '../styles/Login.module.css';

const Login = () => {
  const [userMsg, setUserMsg] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routerChangeComplete', handleComplete);
    router.events.on('routerChangeError', handleComplete);

    return () => {
      router.events.off('routerChangeComplete', handleComplete);
      router.events.off('routerChangeError', handleComplete);
    };
  }, [router]);

  const handleOnChangeEmail = async (e) => {
    const email = e.target.value;
    setEmail(email);
    setUserMsg('');
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        setIsLoading(true);
        const didToken = await loginWithEmail(email);
        if (didToken) {
          router.push('/');
        }
      } catch (e) {
        console.log('Error on login');
      }
    } else {
      setUserMsg('Enter a valid email address');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>SignIn - Neflix </title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <div className={styles.logoWrapper}>
            <Image
              src='/static/netflix.svg'
              alt='Netflix logo'
              width='128px'
              height='34px'
            />
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            type='email'
            placeholder='Email address'
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button
            onClick={handleLoginWithEmail}
            className={styles.loginBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
