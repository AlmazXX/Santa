import { apiURL } from '@/constants';
import React from 'react';

const useImageSrc = (src: string | null) => {
  return src && apiURL + '/' + src;
};

export default useImageSrc;
