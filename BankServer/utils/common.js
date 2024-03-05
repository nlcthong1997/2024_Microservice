export const randomString = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const ddmmyyyHHmmss = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let HH = today.getHours();
  let ii = today.getMinutes();
  let ss = today.getSeconds()

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  if (HH < 10) HH = '0' + HH;
  if (ii < 10) ii = '0' + ii;
  if (ss < 10) ss = '0' + ss;

  const formattedToday = dd + '/' + mm + '/' + yyyy + ' ' + HH + ':' + ii + ':' + ss;
  return formattedToday;
}