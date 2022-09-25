import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  className,
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

  const props = {
    onClick,
    ...otherProps,
  };

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }

  const classes = cx('wrapper', {
    [className]: className,
    rounded,
    primary: primaryStyle,
    outline: outlineStyle,
    text: textStyle,
    small: smallSize,
    large: largeSize,
    disabled,
  });

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('content')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
