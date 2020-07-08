import { useEffect } from 'react';

const useKeyDown = (callback) => {
  useEffect(() => {
    document.addEventListener('keydown', callback);
    return () => document.removeEventListener('keydown', callback);
  });
};

export default useKeyDown;
