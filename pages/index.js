import Head from 'next/head';

import Banner from '../components/banner/banner';
import NavBar from '../components/nav/navbar';
import Card from '../components/card/card';

import styles from '../styles/home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Neflix</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Netflix videos for your entertainment time.'
        />
      </Head>
      <NavBar username={'luciano.mo@gmail.com'} />
      <Banner
        title='Clifford the red dog'
        subTitle='a very cute dog'
        imgUrl='/static/clifford.webp'
      />
      <Card imgUrl='/static/clifford.webp' size='large' />
      <Card imgUrl='/static/clifford.webp' size='medium' />
      <Card imgUrl='/static/clifford.webp' size='small' />
    </div>
  );
}
