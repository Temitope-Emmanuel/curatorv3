import React from 'react';
import { SvgXml } from 'react-native-svg';

const DropdownIcon: React.FC<{
  width: number;
}> = ({ width }) => {
	const xmlString = `<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_152_818" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="21">
  <rect x="0.931519" y="0.5" width="20" height="20" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_152_818)">
  <path d="M10.9315 13L6.76486 8.83331H15.0982L10.9315 13Z" fill="#C2CC90"/>
  </g>
  </svg>
  `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default DropdownIcon;
