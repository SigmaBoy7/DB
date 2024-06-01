import { parseISO, format } from 'date-fns';

export default function formateDate(date) {
  if (!date) {
    return 'Информации нет';
  }
  const parsedDate = parseISO(date);

  // Форматирование даты в нужный формат
  const formattedDate = format(parsedDate, 'MMMM d, yyyy');

  return formattedDate;
}
