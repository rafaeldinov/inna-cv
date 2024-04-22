// import localFont from 'next/dist/compiled/@next/font/dist/local';
import localFont from 'next/font/local';

const seymour = localFont({
  src: [
    {
      path: '../public/fonts/Seymour/Seymourone.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--seymour-font',
  preload: true,
});

const gotham = localFont({
  src: [
    {
      path: '../public/fonts/Gotham/gotham-bold-webfont.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--gotham-font',
  preload: true,
});

const poppins = localFont({
  src: [
    {
      path: '../public/fonts/Poppins/Poppins-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--poppins-font',
  preload: true,
});

const lettergothicstdrusbylyajka = localFont({
  src: [
    {
      path: '../public/fonts/Lettergothicstdrusbylyajka/lettergothicstdrusbylyajka.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--lettergothicstdrusbylyajka-font',
  preload: true,
});

export { poppins, seymour, gotham, lettergothicstdrusbylyajka };
