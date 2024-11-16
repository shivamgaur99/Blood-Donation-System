import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import './ScrollToTop.css';

const ScrollToTop = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <a 
      href="#" 
      className="scroll-to-top" 
      id="scrollToTop" 
      style={{ display: visible ? 'block' : 'none' }} 
      aria-label="Scroll to top"
      onClick={scrollToTop}
    >
      <i className="fas fa-chevron-up"></i>
    </a>
  );
};

export default ScrollToTop;
