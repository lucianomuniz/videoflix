import Image from 'next/image';

import styles from './card.module.css';

const Card = (props) => {
  const { imgUrl, size } = props;

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  return (
    <div className={styles.container}>
      <h3>Card {size}</h3>
      <div className={classMap[size]}>
        <Image
          src={imgUrl}
          alt='image'
          layout='fill'
          className={styles.cardImg}
        />
      </div>
    </div>
  );
};

export default Card;
