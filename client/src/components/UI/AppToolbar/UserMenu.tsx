import { apiURL } from '@/constants';
import { logout } from '@/dispatchers/user/usersThunk';
import { useAppDispatch } from '@/store/hooks';
import { User } from '@/types';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  user: User;
  loggingOut: boolean;
}

const UserMenu: React.FC<Props> = ({ user, loggingOut }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    dispatch(logout());
  };

  const goToWishlist = () => {
    router.push('/wishlist');
  };

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        <Avatar
          alt={user.firstname + ' ' + user.lastname}
          src={apiURL + '/' + user.avatar}
          sx={{ mr: 1 }}
        />
        <span>
          Hello, {user.firstname} {user.lastname}
        </span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          component={Button}
          onClick={goToWishlist}
          style={{ width: '100%', textTransform: 'capitalize' }}
        >
          Wishlist
        </MenuItem>
        <MenuItem
          component={Button}
          onClick={onLogout}
          disabled={loggingOut}
          style={{ width: '100%', textTransform: 'capitalize' }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
