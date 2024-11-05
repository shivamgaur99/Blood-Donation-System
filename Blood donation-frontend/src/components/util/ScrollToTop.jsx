import React, { useEffect, useState } from 'react';
import './ScrollToTop.css';

const ScrollToTop = () => {
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
