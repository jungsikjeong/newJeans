export const date = () => {
  let now = new Date();
  let yearNum = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();

  let year = yearNum.toString();

  let fullDate = '';

  fullDate += year.substr(2, 3) + '.' + month + '.' + date;

  return fullDate;
};
