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
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';

import styles from './Header.module.scss';
import logo from '~/assets/images/logo.png';
import { PopperMenu, PopperWrapper } from '~/components/Popper';
import SearchResultItem from '~/components/SearchResultItem';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const menu_items = [
  {
    icon: <FontAwesomeIcon icon={faGlobe}></FontAwesomeIcon>,
    title: 'English',
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

function Header() {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setSearchResults([
        { text: 'Sach sach sach sach sach sach 12345', isHistory: true },
        { text: 'Sach sach sach sach sach sach sach 53', isHistory: false },
      ]);
    }, 0);
  }, []);

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('wrapper-logo')}>
          <img className={cx('logo')} src={logo} alt="Logo"></img>
          <div className={cx('logo-title')}>BookStore</div>
        </div>

        <Tippy
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
        </Tippy>

        <div className={cx('actions')}>
          <Button outlineStyle>Sign up</Button>
          <Button primaryStyle>Sign in</Button>

          <PopperMenu items={menu_items}>
            <button className={cx('more-btn')}>
              <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
            </button>
          </PopperMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
