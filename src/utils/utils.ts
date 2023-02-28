
export const sizeConverter = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), sizes.length - 1);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
}

/*
Returns a formatted date. 

token:     description:             example:
#YYYY#     4-digit year             1999
#YY#       2-digit year             99
#MMMM#     full month name          February
#MMM#      3-letter month name      Feb
#MM#       2-digit month number     02
#M#        month number             2
#DDDD#     full weekday name        Wednesday
#DDD#      3-letter weekday name    Wed
#DD#       2-digit day number       09
#D#        day number               9
#th#       day ordinal suffix       nd
#hhhh#     2-digit 24-based hour    17
#hhh#      military/24-based hour   17
#hh#       2-digit hour             05
#h#        hour                     5
#mm#       2-digit minute           07
#m#        minute                   7
#ss#       2-digit second           09
#s#        second                   9
#ampm#     "am" or "pm"             pm
#AMPM#     "AM" or "PM"             PM
*/
export const formatDate = (dateString: string, formatting: string = "#MMMM# #DD#, #YYYY#"): string => {
  const date = new Date(dateString);
  let YYYY: any,
    YY: any,
    MMMM: any,
    MMM: any,
    MM: any,
    M: any,
    DDDD: any,
    DDD: any,
    DD: any,
    D: any,
    hhhh: any,
    hhh: any,
    hh: any,
    h: any,
    mm: any,
    m: any,
    ss: any,
    s: any,
    ampm: any,
    AMPM: any,
    dMod: any,
    th: any;
  YY = ((YYYY = date.getFullYear()) + "").slice(-2);
  MM = (M = date.getMonth() + 1) < 10 ? "0" + M : M;
  MMM = (MMMM = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][M - 1]).substring(0, 3);
  DD = (D = date.getDate()) < 10 ? "0" + D : D;
  DDD = (DDDD = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date.getDay()]).substring(0, 3);
  th =
    D >= 10 && D <= 20
      ? "th"
      : (dMod = D % 10) === 1
      ? "st"
      : dMod === 2
      ? "nd"
      : dMod === 3
      ? "rd"
      : "th";
      formatting = formatting
    .replace("#YYYY#", YYYY)
    .replace("#YY#", YY)
    .replace("#MMMM#", MMMM)
    .replace("#MMM#", MMM)
    .replace("#MM#", MM)
    .replace("#M#", M)
    .replace("#DDDD#", DDDD)
    .replace("#DDD#", DDD)
    .replace("#DD#", DD)
    .replace("#D#", D)
    .replace("#th#", th);
  h = hhh = date.getHours();
  if (h === 0) h = 24;
  if (h > 12) h -= 12;
  hh = h < 10 ? "0" + h : h;
  hhhh = hhh < 10 ? "0" + hhh : hhh;
  AMPM = (ampm = hhh < 12 ? "am" : "pm").toUpperCase();
  mm = (m = date.getMinutes()) < 10 ? "0" + m : m;
  ss = (s = date.getSeconds()) < 10 ? "0" + s : s;
  return formatting 
    .replace("#hhhh#", hhhh)
    .replace("#hhh#", hhh)
    .replace("#hh#", hh)
    .replace("#h#", h)
    .replace("#mm#", mm)
    .replace("#m#", m)
    .replace("#ss#", ss)
    .replace("#s#", s)
    .replace("#ampm#", ampm)
    .replace("#AMPM#", AMPM);
};