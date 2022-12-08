import React from 'react';
import { SvgXml } from 'react-native-svg';

const QueueIcon: React.FC<{
  width: number;
}> = ({ width }) => {
	const xmlString = `<svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_152_821" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="31">
  <rect y="0.5" width="30" height="30" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_152_821)">
  <path d="M20 25.5C18.9583 25.5 18.0729 25.1354 17.3438 24.4062C16.6146 23.6771 16.25 22.7917 16.25 21.75C16.25 20.7083 16.6146 19.8229 17.3438 19.0938C18.0729 18.3646 18.9583 18 20 18C20.2292 18 20.4479 18.0154 20.6562 18.0462C20.8646 18.0779 21.0625 18.1458 21.25 18.25V8H27.5V10.5H23.75V21.75C23.75 22.7917 23.3854 23.6771 22.6562 24.4062C21.9271 25.1354 21.0417 25.5 20 25.5ZM3.75 20.5V18H13.75V20.5H3.75ZM3.75 15.5V13H18.75V15.5H3.75ZM3.75 10.5V8H18.75V10.5H3.75Z" fill="#C9C8AA"/>
  </g>
  </svg>
  `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default QueueIcon;
