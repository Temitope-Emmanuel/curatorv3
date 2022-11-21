import React from 'react';
import { SvgXml } from 'react-native-svg';

const DownloadIcon: React.FC<{
  width: number;
  fill?: string;
}> = ({ width, fill = '#B2B4AA' }) => {
  const xmlString = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_2237_197)">
  <path d="M16.125 8.36667C15.5583 5.49167 13.0333 3.33333 10 3.33333C7.59167 3.33333 5.5 4.7 4.45833 6.7C1.95 6.96667 0 9.09167 0 11.6667C0 14.425 2.24167 16.6667 5 16.6667H15.8333C18.1333 16.6667 20 14.8 20 12.5C20 10.3 18.2917 8.51667 16.125 8.36667ZM14.1667 10.8333L10 15L5.83333 10.8333H8.33333V7.5H11.6667V10.8333H14.1667Z" fill="${fill}"/>
  </g>
  <defs>
  <clipPath id="clip0_2237_197">
  <rect width="20" height="20" fill="white"/>
  </clipPath>
  </defs>
  </svg>
  `;

  return <SvgXml xml={xmlString} width={width} />;
};

export default DownloadIcon;
