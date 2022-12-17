type TimeType = {
  Hour: number | string;
  Minute: number | string;
  Second: number | string;
};

export class TimeFormatter {
  totalSeconds = (millisSecond: number) => Math.round(millisSecond / 1000);

  private padWithZeroes = (padNumber: number) => {
    const padString = padNumber.toString();
    if (padNumber < 10) {
      return `0${padString}`;
    }
    return padString;
  };

  getTimeDuration = (totalSeconds: number): TimeType => {
    let hours = 0;
    const seconds = Math.floor(totalSeconds % 60);
    let minutes = Math.floor(totalSeconds / 60);
    if (minutes > 59) {
      hours = Math.floor(minutes / 60);
      minutes %= 60;
    }
    return { Hour: hours, Minute: minutes, Second: seconds };
  };

  getMMSSFromMillis = (totalSeconds: number) => {
    const { Hour, Minute, Second } = this.getTimeDuration(totalSeconds);
    return `${this.padWithZeroes(Number(Hour))}:${this.padWithZeroes(
      Number(Minute)
    )}:${this.padWithZeroes(Number(Second))}`;
  };

  convertFormattedTime = ({ Hour, Minute, Second }: TimeType) =>
    Number(Hour) * 60 * 60 + Number(Minute) * 60 + Number(Second);

  removeMissingValues = (time: TimeType) =>
    Object.values(
      // Remove the hour if it doesn't exist
      `${time.Hour}` === '00' ? { Minute: time.Minute, Second: time.Second } : time
    ).join(':');

  formatTime = (timeObj: TimeType) =>
    `${timeObj.Hour > 0 ? `${timeObj?.Hour}h` : ''} ` + `${timeObj?.Minute}m`;
}

export default TimeFormatter;
