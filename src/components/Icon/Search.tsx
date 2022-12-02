import React from 'react';
import { SvgXml } from 'react-native-svg';
import { SEARCH_ICON } from '../../constants/colors';

const SearchIcon: React.FC<{
  width: number;
  fill?: string;
}> = ({ width, fill = SEARCH_ICON }) => {
	const xmlString = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_308_15" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
  <rect width="30" height="30" fill="${fill}"/>
  </mask>
  <g mask="url(#mask0_308_15)">
  <path d="M24.5 26.25L16.625 18.375C16 18.875 15.2812 19.2708 14.4688 19.5625C13.6562 19.8542 12.7917 20 11.875 20C9.60417 20 7.6825 19.2137 6.11 17.6412C4.53667 16.0679 3.75 14.1458 3.75 11.875C3.75 9.60417 4.53667 7.68208 6.11 6.10875C7.6825 4.53625 9.60417 3.75 11.875 3.75C14.1458 3.75 16.0679 4.53625 17.6412 6.10875C19.2137 7.68208 20 9.60417 20 11.875C20 12.7917 19.8542 13.6562 19.5625 14.4688C19.2708 15.2812 18.875 16 18.375 16.625L26.25 24.5L24.5 26.25ZM11.875 17.5C13.4375 17.5 14.7658 16.9533 15.86 15.86C16.9533 14.7658 17.5 13.4375 17.5 11.875C17.5 10.3125 16.9533 8.98417 15.86 7.89C14.7658 6.79667 13.4375 6.25 11.875 6.25C10.3125 6.25 8.98417 6.79667 7.89 7.89C6.79667 8.98417 6.25 10.3125 6.25 11.875C6.25 13.4375 6.79667 14.7658 7.89 15.86C8.98417 16.9533 10.3125 17.5 11.875 17.5Z" fill="${fill}"/>
  </g>
  </svg>
  `;

	return <SvgXml xml={xmlString} width={width} fill={fill} />;
};

export default SearchIcon;
