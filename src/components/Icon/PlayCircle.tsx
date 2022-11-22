import React from 'react';
import { SvgXml } from 'react-native-svg';

const PlayCircle: React.FC<{
  width: number;
}> = ({ width }) => {
	const xmlString = `<<svg width="44" height="43" viewBox="0 0 44 43" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.9545 9.17047V33.8296L34.3295 21.5L14.9545 9.17047Z" fill="#30311D"/>
  </svg>
  `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default PlayCircle;
