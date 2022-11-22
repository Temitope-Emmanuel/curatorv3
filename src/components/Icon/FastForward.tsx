import React from 'react';
import { SvgXml } from 'react-native-svg';

const FastForwardIcon: React.FC<{
  width: number;
}> = ({ width }) => {
	const xmlString = `<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_172_413" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
  <rect y="0.5" width="20" height="20" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_172_413)">
  <path d="M2.08331 15.5V5.5L9.58331 10.5L2.08331 15.5ZM10.4166 15.5V5.5L17.9166 10.5L10.4166 15.5ZM3.74998 12.375L6.58331 10.5L3.74998 8.625V12.375ZM12.0833 12.375L14.9166 10.5L12.0833 8.625V12.375Z" fill="#1C1B1F"/>
  </g>
  </svg>
  `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default FastForwardIcon;
