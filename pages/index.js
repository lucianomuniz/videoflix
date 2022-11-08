import { useEffect, useState } from 'react';
import Head from 'next/head';

import Banner from '../components/banner/banner';
import NavBar from '../components/nav/navbar';
import SectionCards from '../components/card/section-cards';
import { getVideos, getPopularVideos } from '../lib/videos';
import { getUserLogin } from '../lib/magic-client';

import styles from '../styles/Home.module.css';

// eslint-disable-next-line @next/next/no-typos
export async function getServerSideProps(context) {
  const disneyVideos = await getVideos('disney trailer');
  const productivityVideos = await getVideos('productivity');
  const travelVideos = await getVideos('travel');
  const popularVideos = await getPopularVideos();
  return {
    props: { disneyVideos, productivityVideos, travelVideos, popularVideos },
  };
}

export default function Home(props) {
  const { disneyVideos, productivityVideos, travelVideos, popularVideos } =
    props;

  const [username, setUsername] = useState('');

  useEffect(() => {
    const getUsername = async () => {
      try {
        const { email } = await getUserLogin();
        if (email) {
          setUsername(email);
        }
      } catch (error) {
        console.log('Error retrieving email');
      }
    };
    getUsername();
  }, [username]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Home - Neflix</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Netflix videos for your entertainment time.'
        />
      </Head>
      <div className={styles.main}>
        <NavBar username={username} />
        <Banner
          videoId='4zH5iYM4wJo'
          title='Clifford the red dog'
          subTitle='a very cute dog'
          imgUrl='/static/clifford.webp'
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title='Disney' videos={disneyVideos} size='large' />
          <SectionCards title='Travel' videos={travelVideos} size='small' />
          <SectionCards
            title='Productivity'
            videos={productivityVideos}
            size='medium'
          />
          <SectionCards title='Popular' videos={popularVideos} size='small' />
        </div>
      </div>
    </div>
  );
}
