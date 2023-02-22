'use client';

import { ReactNode } from 'react';
import './globals.css';
import NavBar from '../components/NavBar';
import { ListProvider } from '../hooks/useList';

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="fr" data-theme="dark">
      <head />
      <body>
        <ListProvider>
          <NavBar />
          <div>
            {children}
          </div>
        </ListProvider>
      </body>
    </html>
  );
}
