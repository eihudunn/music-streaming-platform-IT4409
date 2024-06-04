'use client';

import { useRouter } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';
import { signOut, useSession } from 'next-auth/react';
import Button from './Button';
import IconButton from '@material-ui/core/IconButton';
import { useEffect, useState } from 'react';
import { Avatar, makeStyles, Menu, MenuItem } from '@material-ui/core';
import {
  IoIosNotifications,
  IoIosNotificationsOutline,
  IoMdNotifications,
} from 'react-icons/io';
import getNotification from '@/actions/notification/getNotification';
import Notification from '@/scheme/Notification';

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  isContentDetail?: boolean;
  title?: string;
  style?: React.CSSProperties;
}

const useStyles = makeStyles({
  menuItem: {
    color: 'white',
    '&:hover': {
      backgroundColor: '#3E3E3E',
    },
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
  },
  menuNotiItem: {
    color: 'white',
    '&:hover': {
      backgroundColor: '#3E3E3E',
    },
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    height: '50px',
    overflow: 'wrap',
  },
  Menu: {
    backgroundColor: '#282828',
    padding: '0 !important',
    borderRadius: '5%',
    marginTop: '10px',
  },
  Avatar: {
    borderWidth: '4px',
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderStyle: 'solid',
  },
  Icon: {
    borderRadius: '100%',
  },
});

const Header: React.FC<HeaderProps> = ({
  children,
  className,
  isContentDetail,
  title,
  style,
}) => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const getNotifi = async () => {
      const notifi: Notification[] = await getNotification(
        session?.user?._doc._id,
      );
      if (notifi) {
        console.log(notifi);
        setNotifications(notifi);
      }
    };
    if (status === 'authenticated') {
      getNotifi();
    }
  }, [status, session?.user?._doc._id]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = async (event) => {
    setNotificationAnchorEl(event.currentTarget);
    const getNotifi = async () => {
      const notifi = await getNotification(session?.user?._doc._id);
      if (notifi) {
        console.log(notifi);
        setNotifications(notifi);
      }
    };
    getNotifi();
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <div
      className={twMerge('h-fit p-6 pt-0 w-full max-w-[100vw]', className)}
      style={style}
    >
      <div className="w-full mb-4 flex items-center justify-between sticky top-0 h-20 z-50">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
          {/* {isContentDetail && (
            <div className="flex items-center justify-center text-2xl font-bold overflow-hidden ">
              {title}
            </div>
          )} */}
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white hover:placeholder-opacity-75 flex items-center justify-center transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white hover:placeholder-opacity-75 flex items-center justify-center transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {status === 'authenticated' ? (
            <>
              <IconButton
                onClick={handleNotificationClick}
                className={classes.Icon}
              >
                <IoIosNotifications />
              </IconButton>
              <Menu
                anchorEl={notificationAnchorEl}
                open={Boolean(notificationAnchorEl)}
                onClose={handleNotificationClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                classes={{ paper: classes.Menu }}
              >
                {notifications.map((notification, index) => (
                  <MenuItem key={index} className={classes.menuNotiItem}>
                    {notification.content}
                  </MenuItem>
                ))}
              </Menu>
              <Avatar
                alt="avt"
                src={
                  (session?.user?.picture as string) || '/images/default.png'
                }
                onClick={handleMenuClick}
                className={classes.Avatar}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                classes={{ paper: classes.Menu }}
              >
                <MenuItem
                  className={classes.menuItem}
                  onClick={() =>
                    router.push(`/user/${session?.user?._doc._id}`)
                  }
                >
                  Profile
                </MenuItem>
                <MenuItem
                  className={classes.menuItem}
                  onClick={() => signOut()}
                >
                  Sign out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <div>
                <Button
                  onClick={handleSignup}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button onClick={handleLogin} className="bg-white px-6 py-2">
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
