import type { Order, Product } from "../types";

const products: Product[] = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: true,
    photo: '/images/placeholder.webp',
    title: 'Product 1',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29T12:09:33',
      end: '2017-06-29T12:09:33',
    },
    price: [
      { value: 100, symbol: 'USD', isDefault: false },
      { value: 2600, symbol: 'UAH', isDefault: true },
    ],
    order: 1,
    date: '2017-06-29T12:09:33',
  },
  {
    id: 2,
    serialNumber: 1235,
    isNew: true,
    photo: '/images/placeholder.webp',
    title: 'Product 2',
    type: 'Monitors',
    specification: 'Specification 2',
    guarantee: {
      start: '2017-06-29T12:09:33',
      end: '2017-06-29T12:09:33',
    },
    price: [
      { value: 150, symbol: 'USD', isDefault: false },
      { value: 4000, symbol: 'UAH', isDefault: true },
    ],
    order: 2,
    date: '2017-07-01T10:00:00',
  },
];

const orders: Order[] = [
  {
    id: 1,
    title: 'Order 1',
    date: '2017-06-29T12:09:33',
    description: 'Description for order 1',
    products: products.filter((p) => p.order === 1),
  },
  {
    id: 2,
    title: 'Order 2',
    date: '2017-07-01T09:00:00',
    description: 'Description for order 2',
    products: products.filter((p) => p.order === 2),
  },
];

export { orders, products };
