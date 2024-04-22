'use client';

import { useEffect, useState } from 'react';

export default function useImageSize(src: string) {
  const [imageWithSize, setImageWithSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setImageWithSize({ width: img.width, height: img.height });
    };
  }, [src]);

  return imageWithSize;
}
