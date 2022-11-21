type TimeType = {
    Hour: string;
    Minute: string;
    Second: string;
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
  
    getTimeDuration = (totalSeconds: number) => {
      let hours = 0;
      const seconds = Math.floor(totalSeconds % 60);
      let minutes = Math.floor(totalSeconds / 60);
      if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        minutes %= 60;
      }
      return { hours, minutes, seconds };
    };
  
    getMMSSFromMillis = (totalSeconds: number) => {
      const { hours, minutes, seconds } = this.getTimeDuration(totalSeconds);
      return `${this.padWithZeroes(hours)}:${this.padWithZeroes(minutes)}:${this.padWithZeroes(
        seconds
      )}`;
    };
  
    convertFormattedTime = ({ Hour, Minute, Second }: TimeType) =>
      Number(Hour) * 60 * 60 + Number(Minute) * 60 + Number(Second);
  
    removeMissingValues = (time: TimeType) =>
      Object.values(
        // Remove the hour if it doesn't exist
        time.Hour === '00' ? { Minute: time.Minute, Second: time.Second } : time
      ).join(':');
  }
  
  export default TimeFormatter;
  