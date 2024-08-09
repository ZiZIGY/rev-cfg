import { PriceTypes } from "../@types";

export const baseDictionary = [
  "Цвет",
  "Цвет корпуса",
  "Цвет Фасада",
  "Ручки",
  "Ручки-скобы",
  "Торцевые ручки",
  "Ручки кнопки",
  "Вырезы вместо ручек",
  "Петли",
  "Направляющие",
  "Тип стекла",
  "Вырез под плинтус",
  "Перфорация",
  "Задняя стенка",
  "Тип комода",
  "Дополнительный ящик",
  "Доп полка",
  "Доп штанга",
];

export const priceTypes: Array<{
  label: string;
  value: PriceTypes;
}> = [
  {
    label: "%",
    value: PriceTypes.Percent,
  },
  {
    label: "₽",
    value: PriceTypes.Currency,
  },
  {
    label: "Бесплатно",
    value: PriceTypes.Free,
  },
];
