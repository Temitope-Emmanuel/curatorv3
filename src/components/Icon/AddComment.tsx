import React from 'react';
import { SvgXml } from 'react-native-svg';

const AddCommentIcon: React.FC<{
  width: number;
}> = ({ width }) => {
	const xmlString = `<svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_120_371)">
  <path d="M26.9875 5.29999C26.9875 3.92499 25.875 2.79999 24.5 2.79999H4.5C3.125 2.79999 2 3.92499 2 5.29999V20.3C2 21.675 3.125 22.8 4.5 22.8H22L27 27.8L26.9875 5.29999ZM20.75 14.05H15.75V19.05H13.25V14.05H8.25V11.55H13.25V6.54999H15.75V11.55H20.75V14.05Z" fill="#C9C8AA"/>
  </g>
  <defs>
  <clipPath id="clip0_120_371">
  <rect width="30" height="30" fill="white" transform="translate(0 0.299988)"/>
  </clipPath>
  </defs>
  </svg>
  `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default AddCommentIcon;
