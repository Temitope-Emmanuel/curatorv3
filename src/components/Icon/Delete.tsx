import React from 'react';
import {SvgXml} from 'react-native-svg';

const DeleteIcon: React.FC<{
  width: number;
}> = ({width}) => {
  const xmlString = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_2403_399)">
  <path d="M7.5 23.75C7.5 25.125 8.625 26.25 10 26.25H20C21.375 26.25 22.5 25.125 22.5 23.75V8.75H7.5V23.75ZM23.75 5H19.375L18.125 3.75H11.875L10.625 5H6.25V7.5H23.75V5Z" fill="#1C1B1F"/>
  </g>
  <defs>
  <clipPath id="clip0_2403_399">
  <rect width="30" height="30" fill="white"/>
  </clipPath>
  </defs>
  </svg>
  `;

  return <SvgXml xml={xmlString} width={width} />;
};

export default DeleteIcon;