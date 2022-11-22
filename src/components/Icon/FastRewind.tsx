import React from 'react';
import { SvgXml } from 'react-native-svg';

const FastRewindIcon: React.FC<{
  width: number;
}> = ({ width }) => {
	const xmlString = `<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_172_398" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
  <rect y="0.5" width="20" height="20" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_172_398)">
  <path d="M17.9167 15.5L10.4167 10.5L17.9167 5.5V15.5ZM9.58334 15.5L2.08334 10.5L9.58334 5.5V15.5ZM7.91668 12.375V8.625L5.08334 10.5L7.91668 12.375ZM16.25 12.375V8.625L13.4167 10.5L16.25 12.375Z" fill="#1C1B1F"/>
  </g>
  </svg>
  `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default FastRewindIcon;
