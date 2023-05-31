import { apiURL } from '@/constants';

const useImageSrc = (src: string | null) => {
  return src && apiURL + '/' + src;
};

export default useImageSrc;
