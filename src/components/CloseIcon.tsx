import type { FC } from 'react';
import React from 'react';

interface IconProps {
  color?: string;
  size?: number;
}

const CloseIcon: FC<IconProps> = ({ color = '#98A2B3', size= 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 11L11 1M1 1L11 11"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
