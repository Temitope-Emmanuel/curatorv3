import React from 'react';
import { SvgXml } from 'react-native-svg';

const PauseIcon: React.FC<{
  width: number;
}> = ({ width }) => {
	const xmlString = `<svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_1456_390" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="51" height="51">
    <rect x="0.461044" y="0.431183" width="50" height="50" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_1456_390)">
    <path d="M29.6277 40.0145V10.8478H37.961V40.0145H29.6277ZM12.961 40.0145V10.8478H21.2944V40.0145H12.961Z" fill="#30311D"/>
    </g>
    </svg>
    `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default PauseIcon;
