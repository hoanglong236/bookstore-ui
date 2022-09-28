import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import SearchResultItem from '~/components/SearchResultItem';
import { PopperWrapper } from '~/components/Popper';
import styles from './SearchBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    // setTimeout(() => {
    //   setSearchResult([
    //     { text: 'Sach sach sach sach sach sach 12345', isHistory: true },
    //     { text: 'Sach sach sach sach sach sach sach 53', isHistory: false },
    //   ]);
    // }, 0);
    if (!searchValue.trim()) {
      setSearchResult([]);
      return;
    }

    setLoading(true);

    fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
      .then((resp) => resp.json())
      .then((resp) => {
        const searchAdapter = [];
        let text;
        let isHistory;

        resp.data.forEach((data) => {
          text = data.full_name;
          isHistory = Math.random() > Math.random();
          searchAdapter.push({
            text: text,
            isHistory: isHistory,
          });
        });
        setSearchResult(searchAdapter);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [searchValue]);

  const handleClear = () => {
    setSearchValue('');
    // setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowSearchResult(false);
  };

  return (
    <HeadlessTippy
      interactive={true}
      visible={showSearchResult && searchResult.length > 0}
      render={(attrs) => (
        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <h4 className={cx('search-title')}>Result</h4>
            {searchResult.map((result, index) => {
              return <SearchResultItem key={index} text={result.text} isHistory={result.isHistory}></SearchResultItem>;
            })}
          </PopperWrapper>
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <div className={cx('search')}>
        <input
          ref={inputRef}
          value={searchValue}
          placeholder="Search your books"
          spellCheck={false}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowSearchResult(true)}
        ></input>
        {searchValue && !loading && (
          <button className={cx('clear-btn')} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}
        {loading && (
          <div className={cx('loading')}>
            <FontAwesomeIcon icon={faSpinner} />
          </div>
        )}
        <button className={cx('search-btn')}>
          <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default SearchBar;
