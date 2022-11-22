import React from 'react';
import { SvgXml } from 'react-native-svg';

const GraphicEqIcon: React.FC<{
  width: number;
}> = ({ width }) => {
	const xmlString = `<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_350_100" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="31" height="31">
  <rect x="0.5" y="0.0709229" width="30" height="30" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_350_100)">
  <path d="M9.25 22.5709V7.57092H11.75V22.5709H9.25ZM14.25 27.5709V2.57092H16.75V27.5709H14.25ZM4.25 17.5709V12.5709H6.75V17.5709H4.25ZM19.25 22.5709V7.57092H21.75V22.5709H19.25ZM24.25 17.5709V12.5709H26.75V17.5709H24.25Z" fill="#B2B4AA"/>
  </g>
  </svg>
  `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default GraphicEqIcon;
