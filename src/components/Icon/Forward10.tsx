import React from 'react';
import { SvgXml } from 'react-native-svg';

const Forward10Icon: React.FC<{
  width: number;
}> = ({ width }) => {
	const xmlString = `<svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_172_409" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="35">
  <rect x="0.75" width="35" height="35" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_172_409)">
  <path d="M13.875 23.3333V16.7708H11.6875V14.5833H16.0625V23.3333H13.875ZM18.9792 23.3333C18.566 23.3333 18.2199 23.1933 17.9408 22.9133C17.6608 22.6343 17.5208 22.2882 17.5208 21.875V16.0416C17.5208 15.6285 17.6608 15.2819 17.9408 15.0019C18.2199 14.7228 18.566 14.5833 18.9792 14.5833H21.8958C22.309 14.5833 22.6556 14.7228 22.9356 15.0019C23.2147 15.2819 23.3542 15.6285 23.3542 16.0416V21.875C23.3542 22.2882 23.2147 22.6343 22.9356 22.9133C22.6556 23.1933 22.309 23.3333 21.8958 23.3333H18.9792ZM19.7083 21.1458H21.1667V16.7708H19.7083V21.1458ZM18.25 32.0833C16.4271 32.0833 14.7199 31.7372 13.1283 31.045C11.5358 30.3518 10.1504 29.4155 8.97208 28.2362C7.79278 27.0579 6.85653 25.6725 6.16333 24.08C5.47111 22.4885 5.125 20.7812 5.125 18.9583C5.125 17.1354 5.47111 15.4277 6.16333 13.8352C6.85653 12.2437 7.79278 10.8582 8.97208 9.67894C10.1504 8.5006 11.5358 7.56533 13.1283 6.8731C14.7199 6.17991 16.4271 5.83331 18.25 5.83331H18.4687L16.2083 3.5729L18.25 1.45831L24.0833 7.29165L18.25 13.125L16.2083 11.0104L18.4687 8.74998H18.25C15.4063 8.74998 12.9942 9.74019 11.0138 11.7206C9.03236 13.702 8.04167 16.1146 8.04167 18.9583C8.04167 21.8021 9.03236 24.2141 11.0138 26.1946C12.9942 28.176 15.4063 29.1666 18.25 29.1666C21.0938 29.1666 23.5058 28.176 25.4863 26.1946C27.4676 24.2141 28.4583 21.8021 28.4583 18.9583H31.375C31.375 20.7812 31.0289 22.4885 30.3367 24.08C29.6435 25.6725 28.7077 27.0579 27.5294 28.2362C26.3501 29.4155 24.9647 30.3518 23.3731 31.045C21.7806 31.7372 20.0729 32.0833 18.25 32.0833Z" fill="#1C1B1F"/>
  </g>
  </svg>
  `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default Forward10Icon;