import React from 'react';
import { SvgXml } from 'react-native-svg';

const RecommendIcon: React.FC<{
  width: number;
}> = ({ width }) => {
	const xmlString = `<svg width="51" height="50" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_2403_578)">
    <path d="M25.3332 35.9791L38.2082 43.75L34.7915 29.1041L46.1665 19.25L31.1874 17.9791L25.3332 4.16663L19.479 17.9791L4.49988 19.25L15.8749 29.1041L12.4582 43.75L25.3332 35.9791Z" fill="#C9C8AA"/>
    </g>
    <defs>
    <clipPath id="clip0_2403_578">
    <rect width="50" height="50" fill="white" transform="translate(0.333252)"/>
    </clipPath>
    </defs>
    </svg>
    `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default RecommendIcon;
