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
    <html lang="en" data-theme="dark">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ListProvider>
          <NavBar />
          <div className="p-5">
            {children}
          </div>
        </ListProvider>
      </body>
    </html>
  );
}
