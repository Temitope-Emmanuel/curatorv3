import React from 'react';
import { SvgXml } from 'react-native-svg';

const DeleteForeverIcon: React.FC<{
  width: number;
  fill?: string;
}> = ({ width, fill="#C3CE80" }) => {
	const xmlString = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_173_416" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
  <rect width="30" height="30" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_173_416)">
  <path d="M11.75 20.875L15 17.625L18.25 20.875L20 19.125L16.75 15.875L20 12.625L18.25 10.875L15 14.125L11.75 10.875L10 12.625L13.25 15.875L10 19.125L11.75 20.875ZM8.75 26.5C8.0625 26.5 7.47417 26.2554 6.985 25.7663C6.495 25.2763 6.25 24.6875 6.25 24V7.75H5V5.25H11.25V4H18.75V5.25H25V7.75H23.75V24C23.75 24.6875 23.5054 25.2763 23.0163 25.7663C22.5263 26.2554 21.9375 26.5 21.25 26.5H8.75ZM21.25 7.75H8.75V24H21.25V7.75Z" fill="${fill}"/>
  </g>
  </svg>
  `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default DeleteForeverIcon;
