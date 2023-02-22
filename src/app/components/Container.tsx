import { ReactNode } from 'react';

export default function Container({
  children,
}: {
  children: ReactNode,
}) {
  return (
    <div className="p-5">
      {children}
    </div>
  );
}
