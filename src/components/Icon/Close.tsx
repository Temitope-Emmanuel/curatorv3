import React from 'react';
import { SvgXml } from 'react-native-svg';

const CloseIcon: React.FC<{
  width: number;
  fill?: string
}> = ({ width, fill = '#1C1B1F' }) => {
	const xmlString = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_1649_396" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="${fill}"/>
    </mask>
    <g mask="url(#mask0_1649_396)">
    <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="${fill}"/>
    </g>
    </svg>
    `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default CloseIcon;
