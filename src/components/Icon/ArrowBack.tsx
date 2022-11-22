import React from 'react';
import { SvgXml } from 'react-native-svg';

const ArrowBackIcon: React.FC<{
  width: number;
}> = ({ width }) => {
	const xmlString = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_152_452)">
  <path d="M25 13.75H9.7875L16.775 6.7625L15 5L5 15L15 25L16.7625 23.2375L9.7875 16.25H25V13.75Z" fill="#C9C8AA"/>
  </g>
  <defs>
  <clipPath id="clip0_152_452">
  <rect width="30" height="30" fill="white"/>
  </clipPath>
  </defs>
  </svg>
  `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default ArrowBackIcon;
