import React from 'react';
import {SvgXml} from 'react-native-svg';

const EditIcon: React.FC<{
  width: number;
  fill?: string;
}> = ({width, fill = '#1C1B1F'}) => {
  const xmlString = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_2403_405)">
  <path d="M3.75 21.5625V26.25H8.4375L22.2625 12.425L17.575 7.73749L3.75 21.5625ZM26.7625 7.92499L22.075 3.23749L18.9125 6.41249L23.6 11.1L26.7625 7.92499Z" fill="${fill}"/>
  </g>
  <defs>
  <clipPath id="clip0_2403_405">
  <rect width="30" height="30" fill="white"/>
  </clipPath>
  </defs>
  </svg>
  `;

  return <SvgXml xml={xmlString} width={width} />;
};

export default EditIcon;
