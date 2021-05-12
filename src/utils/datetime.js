import moment from 'moment-timezone';

export const stringConvertToDate = (dateString) => {
  let [date, month, year] = dateString.split(' ');
  if (date && month && year) {
    return new Date(year, month - 1, date);
  } else {
    return null;
  }
};

export const dateConvertStringFormat = (aDate, format = 'D MMM YYYY') => {
  return aDate.replace(
    /^(\d{1,2}) (\d{1,2}) (\d{4})$/,
    (str, date, month, year) => {
      if (date && month && year) {
        let d = new Date(year, month - 1, date);
        return moment(d).format(format);
      }
      return '';
    }
  );
};
