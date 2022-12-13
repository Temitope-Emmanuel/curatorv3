import React from 'react';
import {SvgXml} from 'react-native-svg';

const AlternateEmailIcon: React.FC<{
  width: number;
}> = ({width}) => {
  const xmlString = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_2413_376" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
  <rect x="0.400024" y="0.199951" width="24" height="24" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_2413_376)">
  <path d="M12.4 22.2C11.0334 22.2 9.74169 21.9373 8.52502 21.412C7.30836 20.8873 6.24602 20.1706 5.33802 19.262C4.42936 18.354 3.71269 17.2916 3.18802 16.075C2.66269 14.8583 2.40002 13.5666 2.40002 12.2C2.40002 10.8166 2.66269 9.52095 3.18802 8.31295C3.71269 7.10428 4.42936 6.04595 5.33802 5.13795C6.24602 4.22928 7.30836 3.51228 8.52502 2.98695C9.74169 2.46228 11.0334 2.19995 12.4 2.19995C13.7834 2.19995 15.079 2.46228 16.287 2.98695C17.4957 3.51228 18.554 4.22928 19.462 5.13795C20.3707 6.04595 21.0874 7.10428 21.612 8.31295C22.1374 9.52095 22.4 10.8166 22.4 12.2V13.65C22.4 14.6333 22.0627 15.4706 21.388 16.162C20.7127 16.854 19.8834 17.2 18.9 17.2C18.3 17.2 17.7417 17.0666 17.225 16.8C16.7084 16.5333 16.2834 16.1833 15.95 15.75C15.5 16.2 14.971 16.5543 14.363 16.813C13.7544 17.071 13.1 17.2 12.4 17.2C11.0167 17.2 9.83769 16.7123 8.86302 15.737C7.88769 14.7623 7.40002 13.5833 7.40002 12.2C7.40002 10.8166 7.88769 9.63728 8.86302 8.66195C9.83769 7.68728 11.0167 7.19995 12.4 7.19995C13.7834 7.19995 14.9627 7.68728 15.938 8.66195C16.9127 9.63728 17.4 10.8166 17.4 12.2V13.65C17.4 14.1333 17.55 14.5123 17.85 14.787C18.15 15.0623 18.5 15.2 18.9 15.2C19.3 15.2 19.65 15.0623 19.95 14.787C20.25 14.5123 20.4 14.1333 20.4 13.65V12.2C20.4 10.0166 19.6124 8.13728 18.037 6.56195C16.4624 4.98728 14.5834 4.19995 12.4 4.19995C10.2167 4.19995 8.33736 4.98728 6.76202 6.56195C5.18736 8.13728 4.40002 10.0166 4.40002 12.2C4.40002 14.3833 5.18736 16.2623 6.76202 17.837C8.33736 19.4123 10.2167 20.2 12.4 20.2H17.4V22.2H12.4ZM12.4 15.2C13.2334 15.2 13.9417 14.9083 14.525 14.325C15.1084 13.7416 15.4 13.0333 15.4 12.2C15.4 11.3666 15.1084 10.6583 14.525 10.075C13.9417 9.49162 13.2334 9.19995 12.4 9.19995C11.5667 9.19995 10.8584 9.49162 10.275 10.075C9.69169 10.6583 9.40002 11.3666 9.40002 12.2C9.40002 13.0333 9.69169 13.7416 10.275 14.325C10.8584 14.9083 11.5667 15.2 12.4 15.2Z" fill="#1C1B1F"/>
  </g>
  </svg>
  `;

  return <SvgXml xml={xmlString} width={width} />;
};

export default AlternateEmailIcon;