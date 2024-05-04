import type { Metadata } from 'next';
import './globals.scss';
import {
  poppins,
  seymour,
  gotham,
  lettergothicstdrusbylyajka,
} from './custom-fonts';
import UpButton from '../components/up-button/up-button';
import Header from '@/components/header/header';
import SessionProvider from '@/components/session-provider/session-provider';
import { auth } from '@/auth/auth';
import { EdgeStoreProvider } from '@/db/edgestore-provider';

export const metadata: Metadata = {
  title: 'Inna Dinova portfolio',
  description: 'Creative copywriter',
  icons: [
    {
      rel: 'icon',
      type: 'image/ico',
      sizes: '48x48',
      url: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/apple-touch-icon.png',
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html
      lang='en'
      className={`${poppins.variable} ${seymour.variable} ${gotham.variable} ${lettergothicstdrusbylyajka.variable}`}
    >
      <SessionProvider session={session}>
        <EdgeStoreProvider>
          <body>
            <Header />
            <UpButton />
            {children}
          </body>
        </EdgeStoreProvider>
      </SessionProvider>
    </html>
  );
}
