import Head from 'next/head';

import Banner from '../components/banner/banner';
import NavBar from '../components/nav/navbar';
import SectionCards from '../components/card/section-cards';

import styles from '../styles/home.module.css';

export default function Home() {
  const disneyVideos = [
    {
      imgUrl: '/static/clifford.webp',
    },
    {
      imgUrl: '/static/clifford.webp',
    },
    {
      imgUrl: '/static/clifford.webp',
    },
    {
      imgUrl: '/static/clifford.webp',
    },
    {
      imgUrl: '/static/clifford.webp',
    },
  ];

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
      <div className={styles.sectionWrapper}>
        <SectionCards title='Disney' videos={disneyVideos} size='large' />
        <SectionCards
          title='Productitivy'
          videos={disneyVideos}
          size='medium'
        />
        <SectionCards title='Travel' videos={disneyVideos} size='small' />
      </div>
    </div>
  );
}
