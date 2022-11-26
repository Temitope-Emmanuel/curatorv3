import React from 'react';
import { SvgXml } from 'react-native-svg';

const RecommendIcon: React.FC<{
  width: number;
}> = ({ width }) => {
	const xmlString = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_350_258" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
  <rect x="0.134338" y="0.631287" width="15.8978" height="15.8978" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_350_258)">
  <path d="M6.09603 12.5547H9.73928C9.92696 12.5547 10.101 12.5078 10.2613 12.4142C10.4211 12.3202 10.5342 12.1903 10.6004 12.0247L11.9915 8.77893C12.0135 8.72372 12.0301 8.66852 12.0411 8.61332C12.0522 8.55812 12.0577 8.50292 12.0577 8.44772V7.91779C12.0577 7.73011 11.9941 7.57268 11.8669 7.4455C11.7402 7.31876 11.583 7.25539 11.3953 7.25539H8.34822L8.74566 5.0032C8.76774 4.89279 8.76222 4.78791 8.7291 4.68855C8.69598 4.58919 8.64078 4.50087 8.5635 4.42359L8.08325 3.94334L5.03617 7.25539C4.94785 7.34371 4.88161 7.44307 4.83745 7.55347C4.79329 7.66387 4.77121 7.78531 4.77121 7.91779V11.2298C4.77121 11.5942 4.90104 11.9062 5.16071 12.1658C5.41993 12.425 5.7317 12.5547 6.09603 12.5547ZM8.08325 15.2043C7.16692 15.2043 6.30579 15.0303 5.49986 14.6823C4.69393 14.3348 3.99288 13.8629 3.39671 13.2667C2.80055 12.6706 2.32869 11.9695 1.98115 11.1636C1.63316 10.3577 1.45917 9.49653 1.45917 8.5802C1.45917 7.66387 1.63316 6.80274 1.98115 5.99681C2.32869 5.19088 2.80055 4.48983 3.39671 3.89366C3.99288 3.29749 4.69393 2.82542 5.49986 2.47743C6.30579 2.12989 7.16692 1.95612 8.08325 1.95612C8.99959 1.95612 9.86072 2.12989 10.6666 2.47743C11.4726 2.82542 12.1736 3.29749 12.7698 3.89366C13.366 4.48983 13.8378 5.19088 14.1854 5.99681C14.5333 6.80274 14.7073 7.66387 14.7073 8.5802C14.7073 9.49653 14.5333 10.3577 14.1854 11.1636C13.8378 11.9695 13.366 12.6706 12.7698 13.2667C12.1736 13.8629 11.4726 14.3348 10.6666 14.6823C9.86072 15.0303 8.99959 15.2043 8.08325 15.2043ZM8.08325 13.8795C9.56263 13.8795 10.8157 13.3661 11.8424 12.3394C12.8692 11.3126 13.3825 10.0596 13.3825 8.5802C13.3825 7.10082 12.8692 5.84777 11.8424 4.82103C10.8157 3.7943 9.56263 3.28093 8.08325 3.28093C6.60388 3.28093 5.35082 3.7943 4.32409 4.82103C3.29735 5.84777 2.78398 7.10082 2.78398 8.5802C2.78398 10.0596 3.29735 11.3126 4.32409 12.3394C5.35082 13.3661 6.60388 13.8795 8.08325 13.8795Z" fill="#C9C8AA"/>
  </g>
  </svg>
  `;

	return <SvgXml xml={xmlString} width={width} />;
};

export default RecommendIcon;