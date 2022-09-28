import { faClockRotateLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './SearchResultItem.module.scss';

const cx = classNames.bind(styles);

function SearchResultItem({ text, isHistory }) {
  const icon = isHistory ? faClockRotateLeft : faMagnifyingGlass;

  return (
    <Link to={`/@:${encodeURIComponent(text)}`} className={cx('wrapper')}>
      <FontAwesomeIcon icon={icon} className={cx('icon')}></FontAwesomeIcon>
      <span className={cx('result-content')}>{text}</span>
    </Link>
  );
}

export default SearchResultItem;
