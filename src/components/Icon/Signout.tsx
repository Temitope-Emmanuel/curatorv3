import React from 'react';
import { SvgXml } from 'react-native-svg';

const SignoutIcon: React.FC<{
  width: number;
}> = ({ width }) => {
	const xmlString = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_103_450" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
  <rect width="20" height="20" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_103_450)">
  <path d="M4.16667 17.5C3.70833 17.5 3.31583 17.3369 2.98917 17.0108C2.66306 16.6842 2.5 16.2917 2.5 15.8333V4.16667C2.5 3.70833 2.66306 3.31583 2.98917 2.98917C3.31583 2.66306 3.70833 2.5 4.16667 2.5H10V4.16667H4.16667V15.8333H10V17.5H4.16667ZM13.3333 14.1667L12.1875 12.9583L14.3125 10.8333H7.5V9.16667H14.3125L12.1875 7.04167L13.3333 5.83333L17.5 10L13.3333 14.1667Z" fill="#9DA577"/>
  </g>
  </svg>
  `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default SignoutIcon;
