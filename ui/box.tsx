import { twMerge } from "tailwind-merge";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

export const Box = ({ className, children }: BoxProps) => {
  return (
    <div className={twMerge(`bg-DARK_SECONDARY_BACKGROUND rounded-lg h-fit w-full`, className )}>
      {children}
    </div>
  );
}