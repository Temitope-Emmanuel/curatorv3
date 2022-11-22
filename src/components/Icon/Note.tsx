import React from 'react';
import { SvgXml } from 'react-native-svg';

const NoteIcon: React.FC<{
  width: number;
}> = ({ width }) => {
	const xmlString = `<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_350_122)">
  <path d="M4.25 22.5709H19.25V20.0709H4.25V22.5709ZM4.25 7.57092V10.0709H26.75V7.57092H4.25ZM4.25 16.3209H26.75V13.8209H4.25V16.3209Z" fill="#B2B4AA"/>
  </g>
  <defs>
  <clipPath id="clip0_350_122">
  <rect width="30" height="30" fill="white" transform="translate(0.5 0.0709229)"/>
  </clipPath>
  </defs>
  </svg>
  `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default NoteIcon;
