import { Card } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import defaultCard from '../../../assets/images/defaultCard.jpg';
import style from './Card.module.css';

interface Props extends React.PropsWithChildren {
  image?: string | null;
  link?: string;
}

const PartyItem: React.FC<Props> = ({ image, link, children }) => {
  const router = useRouter();
  const existingLink = link ? link : undefined;

  const onClick = React.useCallback(
    (link: string) => {
      router.push(link);
    },
    [router],
  );

  return (
    <Card
      className={style.card}
      onClick={existingLink ? () => onClick(existingLink) : undefined}
      style={existingLink ? { cursor: 'pointer' } : {}}
    >
      {children}
      <Image
        src={image ? image : defaultCard}
        alt={image ? image : 'default'}
        className={style.card__image}
        fill
        sizes="100%"
        priority
      />
      <div className={style.background} />
    </Card>
  );
};

export default PartyItem;
