import { useEffect } from 'react';

const useKeyUp = (callback) => {
  useEffect(() => {
    document.addEventListener('keyup', callback);
    return () => document.removeEventListener('keyup', callback);
  });
};

export default useKeyUp;
