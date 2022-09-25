import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Menu.module.scss';
import { PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

const defaultOnChangeFc = () => {};

function Menu({ children, items = [], onChange = defaultOnChangeFc, offset }) {
  const [historyStack, setHistoryStack] = useState([
    {
      data: items,
    },
  ]);

  const currentHistory = historyStack[historyStack.length - 1];

  const renderItems = () => {
    return currentHistory.data.map((item, index) => {
      const hasSubMenu = item.subMenu;
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (hasSubMenu) {
              setHistoryStack((prev) => [...prev, item.subMenu]);
            } else {
              onChange(item);
            }
          }}></MenuItem>
      );
    });
  };

  return (
    <Tippy
      interactive={true}
      offset={offset}
      delay={[0, 500]}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx('content')} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            {historyStack.length > 1 && (
              <Header
                title="Language"
                onBack={() => {
                  setHistoryStack((prev) => prev.slice(0, prev.length - 1));
                }}></Header>
            )}
            {renderItems()}
          </PopperWrapper>
        </div>
      )}
      onHide={() => setHistoryStack((prev) => prev.slice(0, 1))}>
      {children}
    </Tippy>
  );
}

export default Menu;
