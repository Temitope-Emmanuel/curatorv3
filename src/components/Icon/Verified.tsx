import React from 'react';
import {SvgXml} from 'react-native-svg';

const VerifiedIcon: React.FC<{
  width: number;
}> = ({width}) => {
  const xmlString = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_2403_393" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
  <rect width="30" height="30" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_2403_393)">
  <path d="M10.75 28.125L8.375 24.125L3.875 23.125L4.3125 18.5L1.25 15L4.3125 11.5L3.875 6.875L8.375 5.875L10.75 1.875L15 3.6875L19.25 1.875L21.625 5.875L26.125 6.875L25.6875 11.5L28.75 15L25.6875 18.5L26.125 23.125L21.625 24.125L19.25 28.125L15 26.3125L10.75 28.125ZM11.8125 24.9375L15 23.5625L18.25 24.9375L20 21.9375L23.4375 21.125L23.125 17.625L25.4375 15L23.125 12.3125L23.4375 8.8125L20 8.0625L18.1875 5.0625L15 6.4375L11.75 5.0625L10 8.0625L6.5625 8.8125L6.875 12.3125L4.5625 15L6.875 17.625L6.5625 21.1875L10 21.9375L11.8125 24.9375ZM13.6875 19.4375L20.75 12.375L19 10.5625L13.6875 15.875L11 13.25L9.25 15L13.6875 19.4375Z" fill="#1C1B1F"/>
  </g>
  </svg>
  `;

  return <SvgXml xml={xmlString} width={width} />;
};

export default VerifiedIcon;
