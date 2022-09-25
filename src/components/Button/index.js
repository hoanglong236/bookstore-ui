import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  otherClassNames,
  rounded = false,
  primaryStyle = false,
  outlineStyle = false,
  textStyle = false,
  smallSize = false,
  largeSize = false,
  disabled = false,
  children,
  leftIcon,
  rightIcon,
  onClick,
  ...otherProps
}) {
  let Comp = 'button';

  const compProps = {
    onClick,
    ...otherProps,
  };

  if (disabled) {
    Object.keys(compProps).forEach((key) => {
      if (key.startsWith('on') && typeof compProps[key] === 'function') {
        delete compProps[key];
      }
    });
  }

  if (to) {
    compProps.to = to;
    Comp = Link;
  } else if (href) {
    compProps.href = href;
    Comp = 'a';
  }

  const compClasses = cx('wrapper', {
    [otherClassNames]: otherClassNames,
    rounded,
    primary: primaryStyle,
    outline: outlineStyle,
    text: textStyle,
    small: smallSize,
    large: largeSize,
    disabled,
  });

  return (
    <Comp className={compClasses} {...compProps}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('content')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
