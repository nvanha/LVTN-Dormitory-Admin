import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCustom = ({ length, width, height }) => [...new Array(length || 1)].map((item, index) => (
  <Skeleton
    key={index}
    count={1}
    width={width}
    height={height}
    style={{ lineHeight: 'normal' }}
  />
));

export default SkeletonCustom;
