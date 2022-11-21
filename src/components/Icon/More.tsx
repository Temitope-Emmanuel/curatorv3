import React from 'react';
import { SvgXml } from 'react-native-svg';
import { MORE_ICON } from '../../constants/colors';

const MoreIcon: React.FC<{
  width: number;
  fill?: string;
}> = ({ width, fill = MORE_ICON }) => {
	const xmlString = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_350_156)">
  <path d="M15 10C16.375 10 17.5 8.875 17.5 7.5C17.5 6.125 16.375 5 15 5C13.625 5 12.5 6.125 12.5 7.5C12.5 8.875 13.625 10 15 10ZM15 12.5C13.625 12.5 12.5 13.625 12.5 15C12.5 16.375 13.625 17.5 15 17.5C16.375 17.5 17.5 16.375 17.5 15C17.5 13.625 16.375 12.5 15 12.5ZM15 20C13.625 20 12.5 21.125 12.5 22.5C12.5 23.875 13.625 25 15 25C16.375 25 17.5 23.875 17.5 22.5C17.5 21.125 16.375 20 15 20Z" fill="${fill}"/>
  </g>
  <defs>
  <clipPath id="clip0_350_156">
  <rect width="30" height="30" fill="${fill}"/>
  </clipPath>
  </defs>
  </svg>
  `;

	return <SvgXml xml={xmlString} width={width} fill={fill} />;
};

export default MoreIcon;
