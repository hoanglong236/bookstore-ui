import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faGlobe,
  faQuestionCircle,
  faKeyboard,
  faGear,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faBell, faHeart, faAddressCard } from '@fortawesome/free-regular-svg-icons';

import styles from './Header.module.scss';
import logo from '~/assets/images/logo.png';
import { PopperMenu } from '~/components/Popper';
import Button from '~/components/Button';
import { RegularCartShoppingIcon } from '~/components/Icons';
import Image from '~/components/Image';
import SearchBar from '~/layouts/components/SearchBar';

const cx = classNames.bind(styles);

const menu_items = [
  {
    icon: <FontAwesomeIcon icon={faGlobe}></FontAwesomeIcon>,
    title: 'English',
    subMenu: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: '...',
          title: 'English',
          subMenu: {
            type: 'language',
            title: 'English',
            data: [
              {
                type: 'language',
                code: 'us',
                title: 'English (us)',
              },
              {
                type: 'language',
                code: 'en',
                title: 'English (en)',
              },
            ],
          },
        },
        {
          code: 'vi',
          title: 'Vietnamese (vi)',
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon>,
    title: 'Feedback and help',
    to: '/admin',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>,
    title: 'Keyboard shortcut',
  },
];

const user_menu = [
  {
    icon: <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>,
    title: 'Profile',
  },
  {
    icon: <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>,
    title: 'Settings',
  },
  ...menu_items,
  {
    icon: <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>,
    title: 'Logout',
    separate: true,
  },
];

function Header() {
  const currentUser = true;

  // handle logic
  const handlePropperMenuChange = (menuItem) => {
    console.log(menuItem);
    switch (menuItem.type) {
      case 'language':
        break;
      default:
    }
  };

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('wrapper-logo')}>
          <img className={cx('logo')} src={logo} alt="Logo"></img>
          <div className={cx('logo-title')}>BookStore</div>
        </div>

        <SearchBar></SearchBar>

        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <button className={cx('action-btn')}>
                <FontAwesomeIcon icon={faBell} width="2.2rem" height="2.2rem"></FontAwesomeIcon>
              </button>
              <button className={cx('action-btn')}>
                <FontAwesomeIcon icon={faHeart} width="2.2rem" height="2.2rem"></FontAwesomeIcon>
              </button>
              <button className={cx('action-btn')}>
                <RegularCartShoppingIcon width="2.2rem" height="2.2rem"></RegularCartShoppingIcon>
              </button>

              <PopperMenu items={user_menu} onChange={handlePropperMenuChange} offset={[10, 10]}>
                <Image
                  className={cx('user-avatar')}
                  src="https://www.travelanddestinations.com/wp-content/uploads/2019/10/Ban-Gioc-Detian-Waterfalls-closeup.jpg"
                  alt="Avatar"></Image>
              </PopperMenu>
            </>
          ) : (
            <>
              <Button outlineStyle>Sign up</Button>
              <Button primaryStyle>Sign in</Button>

              <PopperMenu items={menu_items} onChange={handlePropperMenuChange} offset={[10, 10]}>
                <button className={cx('more-btn')}>
                  <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                </button>
              </PopperMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
