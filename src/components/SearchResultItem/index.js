import { faClockRotateLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import styles from './SearchResultItem.module.scss';

const cx = classNames.bind(styles);

function SearchResultItem({ text, isHistory }) {
  const icon = isHistory ? faClockRotateLeft : faMagnifyingGlass;
  // const text = result.result.text;

  return (
    <div className={cx('wrapper')}>
      <FontAwesomeIcon icon={icon} className={cx('icon')}></FontAwesomeIcon>
      <span className={cx('result-content')}>{text}</span>
    </div>
  );
}

export default SearchResultItem;
