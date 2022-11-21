import React from 'react';
import { SvgXml } from 'react-native-svg';

const EditBorderIcon: React.FC<{
  width: number;
}> = ({ width }) => {
	const xmlString = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_173_426" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
  <rect width="30" height="30" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_173_426)">
  <path d="M2.5 30V25H27.5V30H2.5ZM5 22.5V17.8125L16.3125 6.49998L21 11.1875L9.6875 22.5H5ZM7.5 20H8.625L17.5 11.1875L16.3125 9.99998L7.5 18.875V20ZM22.4062 9.81248L17.7188 5.12498L19.9688 2.87498C20.1979 2.62498 20.4896 2.50498 20.8438 2.51498C21.1979 2.52581 21.4896 2.64581 21.7188 2.87498L24.6562 5.81248C24.8854 6.04165 25 6.32831 25 6.67248C25 7.01581 24.8854 7.31248 24.6562 7.56248L22.4062 9.81248Z" fill="#C3CE80"/>
  </g>
  </svg>
  `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default EditBorderIcon;
