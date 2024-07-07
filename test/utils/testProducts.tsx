import { Product, ProductShortInfo } from "../../src/common/types";

const productsWhithoutId = [
  {
    name: "Very good product",
    price: 1000,
  },
  {
    name: "Just product",
    price: 100,
  },
  // {
  //   name: "Just product",
  //   price: 100,
  // },
];

export const productsShort: ProductShortInfo[] = [
  {
    ...productsWhithoutId[0],
    id: 0,
  },
  {
    ...productsWhithoutId[1],
    id: 1,
  },
];

export const products: Product[] = [
  {
    ...productsShort[0],
    description: "O_O",
    color: "purple",
    material: "Concrete",
  },
  {
    ...productsShort[1],
    description: "0_0",
    color: "magenta",
    material: "Metal",
  },
];

export const productsCart = {
  0: { ...productsWhithoutId[0], count: 2 },
  1: { ...productsWhithoutId[1], count: 30 },
};