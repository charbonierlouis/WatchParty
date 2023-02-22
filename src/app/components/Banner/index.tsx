import { ReactNode } from 'react';

interface Props {
  image: string;
  children: ReactNode;
}

function Banner({
  image,
  children,
}: Props) {
  return (
    <div className="hero" style={{ backgroundImage: `url("${process.env.NEXT_PUBLIC_MEDIA}${image}")` }}>
      <div className="hero-overlay bg-opacity-60" />
      <div className="hero-content text-center text-neutral-content p-5 w-full">
        <div className="w-full max-w-[1280px] flex flex-col-reverse lg:flex-row justify-between gap-[64px]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Banner;
