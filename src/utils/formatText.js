export default function shortenDescription(description) {
  const size = 120;

  if (!description) {
    return 'Нету описания';
  }

  // Проверка на пустую строку или короткое описание
  if (description.length <= size) {
    return description;
  }

  // Находим последнее слово, которое уместится в максимальную длину
  let lastSpaceIndex = size;
  while (lastSpaceIndex > 0 && description[lastSpaceIndex] !== ' ') {
    lastSpaceIndex--;
  }

  // Обрезаем текст до последнего пробела или максимальной длины
  const shortened = description.slice(0, lastSpaceIndex);

  // Удаляем лишние пробелы и добавляем многоточие
  return shortened.trim() + '...';
}
