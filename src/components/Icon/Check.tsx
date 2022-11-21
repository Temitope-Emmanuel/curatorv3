import React from 'react';
import { SvgXml } from 'react-native-svg';

const CheckIcon: React.FC<{
  width: number;
}> = ({ width }) => {
	const xmlString = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_1554_390" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
    <rect x="0.713196" y="0.689056" width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_1554_390)">
    <path d="M10.2632 18.6891L4.56317 12.9891L5.98817 11.5641L10.2632 15.8391L19.4382 6.66406L20.8632 8.08906L10.2632 18.6891Z" fill="#1C1B1F"/>
    </g>
    </svg>
    `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default CheckIcon;
