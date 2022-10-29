import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Neflix</title>
        <meta
          name='description'
          content='Netflix videos to your entertainment'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Netflix</h1>
    </div>
  );
}
