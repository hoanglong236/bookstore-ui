import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Header.module.scss';
import logo from '~/assets/images/logo.png';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('wrapper-logo')}>
          <img className={cx('logo')} src={logo} alt="Logo"></img>
          <div className={cx('logo-title')}>BookStore</div>
        </div>

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

        <div className={cx('actions')}>Testshfjfwehkerwkrrhhrk</div>
      </div>
    </header>
  );
}

export default Header;
