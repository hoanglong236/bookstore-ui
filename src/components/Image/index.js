import classNames from 'classnames/bind';
import { forwardRef, useState } from 'react';

import images from '~/assets/images';
import styles from './Image.module.scss';

const cx = classNames.bind(styles);

const Image = forwardRef(({ src, alt, className, fallbackImage = images.defaultImage, ...props }, ref) => {
  const [srcImage, setSrcImage] = useState(src);

  const handleLoadImageFailed = () => {
    setSrcImage(fallbackImage);
  };

  return (
    <img
      className={cx('wrapper', className)}
      ref={ref}
      src={srcImage}
      alt={props.alt || 'image'}
      {...props}
      onError={handleLoadImageFailed}></img>
  );
});

export default Image;
