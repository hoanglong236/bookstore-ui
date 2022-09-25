import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faSpinner,
  faMagnifyingGlass,
  faEllipsisVertical,
  faGlobe,
  faQuestionCircle,
  faKeyboard,
  faBell,
  faHeart,
  faCartShopping,
  faGear,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';

import styles from './Header.module.scss';
import logo from '~/assets/images/logo.png';
import { PopperMenu, PopperWrapper } from '~/components/Popper';
import SearchResultItem from '~/components/SearchResultItem';
import Button from '~/components/Button';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';

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
  const [searchResults, setSearchResults] = useState([]);

  const currentUser = true;

  useEffect(() => {
    setTimeout(() => {
      setSearchResults([
        { text: 'Sach sach sach sach sach sach 12345', isHistory: true },
        { text: 'Sach sach sach sach sach sach sach 53', isHistory: false },
      ]);
    }, 0);
  }, []);

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

        <HeadlessTippy
          interactive={true}
          visible={searchResults.length > 0}
          render={(attrs) => (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h4 className={cx('search-title')}>Result</h4>
                {searchResults.map((result, index) => {
                  return (
                    <SearchResultItem key={index} text={result.text} isHistory={result.isHistory}></SearchResultItem>
                  );
                })}
              </PopperWrapper>
            </div>
          )}>
          <div className={cx('search')}>
            <input placeholder="Search your books" spellCheck={false}></input>
            <button className={cx('clear-btn')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <div className={cx('loading', 'loading--hidden')}>
              <FontAwesomeIcon icon={faSpinner} />
            </div>
            <button className={cx('search-btn')}>
              <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
            </button>
          </div>
        </HeadlessTippy>

        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <button className={cx('action-btn')}>
                <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
              </button>
              <button className={cx('action-btn')}>
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
              </button>
              <button className={cx('action-btn')}>
                <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
              </button>

              <PopperMenu items={user_menu} onChange={handlePropperMenuChange} offset={[10, 10]}>
                <img
                  className={cx('user-avatar')}
                  src="https://www.travelanddestinations.com/wp-content/uploads/2019/10/Ban-Gioc-Detian-Waterfalls-closeup.jpg"
                  alt="Avatar"></img>
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
