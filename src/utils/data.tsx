import ImageLinks from '../assets/images';
import { ImageSourcePropType } from 'react-native';

interface DrinkItem {
  id: string;
  image: ImageSourcePropType;
  abv: number;
}

export const dummyData: DrinkItem[] = [
  {
    id: '1',
    image: ImageLinks.WHEAT_BEER,
    abv: 5,
  },
  {
    id: '2',
    image: ImageLinks.WHEAT_BEER,
    abv: 7,
  },
  {
    id: '3',
    image: ImageLinks.WHEAT_BEER,
    abv: 4.5,
  },
  {
    id: '4',
    image: ImageLinks.WHEAT_BEER,
    abv: 9.5,
  },
];

export interface ILiquorItem {
  id: number;
  image?: ImageSourcePropType;
  name: string;
}

export const liquorList: ILiquorItem[] = [
  {
    id: 1,
    image: ImageLinks.STRONG_BEER,
    name: 'Strong Beers',
  },
  {
    id: 2,
    image: ImageLinks.LIGHT_BEER,
    name: 'Light Beers',
  },
  {
    id: 3,
    image: ImageLinks.IPA,
    name: "IPA'S",
  },
  {
    id: 4,
    image: ImageLinks.LAGERS,
    name: 'Lagers',
  },
  {
    id: 5,
    image: ImageLinks.HEFEWEIZENS,
    name: 'Hefewelzens',
  },
  {
    id: 6,
    image: ImageLinks.GERMAN_ALE,
    name: "German Ale's",
  },
  {
    id: 7,
    image: ImageLinks.STOUTS,
    name: 'Stouts',
  },
  {
    id: 8,
    image: ImageLinks.PILSNER,
    name: 'Pilsner',
  },
];

export type Label = {
  id: number;
  name: string;
  items: Item[];
  totalQuantity: number;
};

export type Item = {
  name: string;
  quantity: number;
};

export const labels: Label[] = [
  {
    id: 1,
    name: 'Grain',
    items: [
      { name: 'Barley', quantity: 500 },
      { name: 'Wheat', quantity: 300 },
      { name: 'Rye', quantity: 120 },
    ],
    totalQuantity: 920,
  },
  {
    id: 2,
    name: 'Boil Ingredients',
    items: [
      { name: 'Hops', quantity: 150 },
      { name: 'Spices', quantity: 75 },
    ],
    totalQuantity: 220,
  },
  {
    id: 3,
    name: 'Water',
    items: [
      { name: 'Spring Water', quantity: 4 },
      { name: 'Filtered Water', quantity: 1.5 },
    ],
    totalQuantity: 5.5,
  },
  {
    id: 4,
    name: 'Yeast',
    items: [
      { name: 'Ale Yeast', quantity: 80 },
      { name: 'Lager Yeast', quantity: 40 },
    ],
    totalQuantity: 120,
  },
];

export const subLabels = [
  { id: 1, name: 'Grain', items: ['Barley', 'Wheat', 'Rye'] },
  { id: 2, name: 'Boil Ingredients', items: ['Hops', 'Spices'] },
  { id: 3, name: 'Water', items: ['Spring Water', 'Filtered Water'] },
  { id: 4, name: 'Yeast', items: ['Ale Yeast', 'Lager Yeast'] },
];

export const brewPodList = [
  { id: 1, status: `Available`, name: `My Brewpod` },
  { id: 2, status: `Available`, name: `My Brewpod` },
  { id: 3, status: `Busy`, name: `My Brewpod` },
  { id: 4, status: `Available`, name: `My Brewpod` },
];

export const lineChartData = {
  labels: ['0', '20', '40', '60', '80', '100'],
  datasets: [
    {
      data: [0, 25, 50, 80, 90, 100],
    },
  ],
};
