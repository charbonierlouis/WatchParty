import { ReactNode } from 'react';
import './globals.css';
import NavBar from '../components/NavBar';
import Providers from '../hooks/Providers';

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="fr" data-theme="dark">
      <head />
      <body>
        <Providers>
          <NavBar />
          <div>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
