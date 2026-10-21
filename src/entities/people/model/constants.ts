import { RelationPeople } from "./types";

export const RelationPeopleLabels: Record<RelationPeople, string> = {
  [RelationPeople.Family]: 'Родственник',
  [RelationPeople.Friend]: 'Друг',
  [RelationPeople.Colleague]: 'Коллега',
}

export const RelationPeopleItems = Object.entries(RelationPeopleLabels).map(
  ([value, title]) => ({
    title,
    value,
  })
)
export const PackagingIconItems = [
  { title: 'Круг', value: 'mdi-circle-outline' },
  { title: 'Треугольник', value: 'mdi-triangle-outline' },
  { title: 'Пятиугольник', value: 'mdi-pentagon-outline' },
  { title: 'Восьмиугольник', value: 'mdi-octagon-outline' },
  { title: 'Ромб', value: 'mdi-rhombus-outline' },
  { title: 'Звезда', value: 'mdi-star-outline' },
  { title: 'Сердце', value: 'mdi-heart-outline' },
  { title: 'Стрелка', value: 'mdi-arrow-right' },
  { title: 'Стрелка вправо-влево', value: 'mdi-arrow-left-right' },
  { title: 'Плюс', value: 'mdi-plus-outline' },
  { title: 'Минус', value: 'mdi-minus' },
  { title: 'Вопрос', value: 'mdi-help-circle-outline' },
  { title: 'Восклицание', value: 'mdi-alert-circle-outline' },
  { title: 'Галочка', value: 'mdi-check-circle-outline' },
  { title: 'Запрет', value: 'mdi-cancel' },
  { title: 'Капля', value: 'mdi-water-outline' },
  { title: 'Облако', value: 'mdi-cloud-outline' },
  { title: 'Луна', value: 'mdi-moon-waning-crescent' },
  { title: 'Солнце', value: 'mdi-white-balance-sunny' },
  { title: 'Молния', value: 'mdi-lightning-bolt-outline' },
  { title: 'Лист', value: 'mdi-leaf' },
  { title: 'Цветок', value: 'mdi-flower-outline' },
  { title: 'Ключ', value: 'mdi-key-outline' },
  { title: 'Замок', value: 'mdi-lock-outline' },
  { title: 'Бант', value: 'mdi-ribbon' },
  { title: 'Чашка', value: 'mdi-coffee-outline' },
  { title: 'Книга', value: 'mdi-book-outline' },
  { title: 'Письмо', value: 'material-symbols:mail-outline' },
  { title: 'Музыка', value: 'mdi-music-note-outline' },
  { title: 'Дом', value: 'mdi-home-outline' },
  { title: 'Дерево', value: 'mdi-tree-outline' },
  { title: 'Ветер', value: 'material-symbols:air-rounded' },
  { title: 'Доллар', value: 'material-symbols:attach-money' },
  { title: 'Юани', value: 'material-symbols:currency-yuan' },
  { title: 'Евро', value: 'material-symbols:euro-rounded' },
  { title: 'Воздушный змей', value: 'material-symbols:family-link-outline' },
]