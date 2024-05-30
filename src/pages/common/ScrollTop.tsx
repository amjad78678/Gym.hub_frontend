import  { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTop = () => {
  const { pathname } = useLocation();


    useEffect(() => {
      if (!pathname.startsWith('/personal-trainer')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, [pathname]);

  return null;
};

export default ScrollTop;
