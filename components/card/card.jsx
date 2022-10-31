import { useState } from 'react';
import Image from 'next/image';
import cls from 'classnames';
import { motion } from 'framer-motion';

import styles from './card.module.css';

const Card = (props) => {
  const {
    id,
    imgUrl = 'https://images.unsplash.com/photo-1485846234645-a62644f84728',
    size = 'medium',
  } = props;

  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    setImgSrc('https://images.unsplash.com/photo-1485846234645-a62644f84728');
  };

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        whileHover={{ ...scale }}
      >
        <Image
          src={imgSrc}
          alt='image'
          layout='fill'
          onError={handleOnError}
          className={styles.cardImg}
        />
      </motion.div>
    </div>
  );
};

export default Card;
