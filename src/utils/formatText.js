export default function shortenDescription(description) {
  if (!description) {
    return 'Нету описания';
  }

  // Проверка на пустую строку или короткое описание
  if (description.length <= 70) {
    return description;
  }

  // Находим последнее слово, которое уместится в максимальную длину
  let lastSpaceIndex = 70;
  while (lastSpaceIndex > 0 && description[lastSpaceIndex] !== ' ') {
    lastSpaceIndex--;
  }

  // Обрезаем текст до последнего пробела или максимальной длины
  const shortened = description.slice(0, lastSpaceIndex);

  // Удаляем лишние пробелы и добавляем многоточие
  return shortened.trim() + '...';
}
