'use client';

import React, { useState, useEffect } from 'react';

const FlareCursor = () => {
  const [position, setPosition] = useState({
    mouseX: 0,
    mouseY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (evt: MouseEvent) => {
      const interval = setTimeout(() => {
        setPosition({
          mouseX: evt.pageX - 30,
          mouseY: evt.pageY - 30,
        });
      }, 150);
      return () => clearTimeout(interval);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [position]);

  return (
    <div
      id='circle'
      className='circle'
      style={{
        left: position.mouseX + 'px',
        top: position.mouseY + 'px',
      }}
    ></div>
  );
};

export default FlareCursor;
