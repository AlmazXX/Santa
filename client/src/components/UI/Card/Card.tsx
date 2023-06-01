import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Card, Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import defaultCard from '../../../assets/images/defaultCard.jpg';
import style from './Card.module.css';

interface Props extends React.PropsWithChildren {
  image?: string | null;
  link?: string;
  width?: string;
  actions?: {
    action: () => void;
    title: string;
    isHidden?: boolean;
  }[];
}

const CutsomCard: React.FC<Props> = ({
  image,
  link,
  width,
  actions,
  children,
}) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const existingLink = link ? link : undefined;

  const onOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const onClick = (link: string) => {
    router.push(link);
  };

  const menu =
    actions && actions.length ? (
      <>
        <IconButton className={style.card__toggle} onClick={onOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={isOpen} onClose={onClose}>
          {actions
            .filter((action) => !action.isHidden)
            .map((action) => (
              <MenuItem key={action.title} onClick={action.action}>
                {action.title}
              </MenuItem>
            ))}
        </Menu>
      </>
    ) : null;

  return (
    <Card
      className={style.card}
      style={existingLink ? { cursor: 'pointer', width } : { width }}
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
      <div
        className={style.card__background}
        onClick={existingLink ? () => onClick(existingLink) : undefined}
      />
      {menu}
    </Card>
  );
};

export default CutsomCard;
