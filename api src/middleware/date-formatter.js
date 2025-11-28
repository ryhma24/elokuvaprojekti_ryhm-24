
//täällä formatoidaan päivämäärä muotoon yyyy/mm/dddd
export function formatDay()
{

const today = new Date();
const numWeeks = 2;
today.setDate(today.getDate() + numWeeks * 7); // täällä pukataan ''today'' 2 viikon päähän.
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '/' + mm + '/' + yyyy;

return formattedToday
}

export function formatToday()
{

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '/' + mm + '/' + yyyy;

return formattedToday
}