import React from 'react';
import {SvgXml} from 'react-native-svg';

const AddIcon: React.FC<{
  width: number;
}> = ({width}) => {
  const xmlString = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_147_341)">
  <path d="M39.1667 26.6667H26.6667V39.1667H22.5V26.6667H10V22.5H22.5V10H26.6667V22.5H39.1667V26.6667Z" fill="black"/>
  </g>
  <defs>
  <clipPath id="clip0_147_341">
  <rect width="50" height="50" fill="white"/>
  </clipPath>
  </defs>
  </svg>
  `;

  return <SvgXml xml={xmlString} width={width} />;
};

export default AddIcon;
