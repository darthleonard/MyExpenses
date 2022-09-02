import Dexie, { Table } from 'dexie';

export interface Shopping {
  id: number;
  creationDate: Date;
  lastModDate: Date;
  effectiveDate: Date;
  name: string;
  total: number;
  productsDetail: {
    id: number,
    name: string,
    brand: string,
    store: string,
    unitPrice: number,
    quantity: number,
    totalAmount?: number,
    onCar: boolean,
    image?: string
  }[];
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  image?: string;
}

export interface Store {
  id: number;
  creationDate: Date;
  lastModDate: Date;
  name: string;
}

export class AppDatabase extends Dexie {
  shoppingLists: Table<Shopping, number>;
  products: Table<Shopping, number>;
  storeList: Table<Store, number>;

  constructor() {
    super('MyExpensesApp');
    this.version(1).stores({
      shoppingLists: '++id',
      products: '++id',
      storeList: '++id',
    });
  }
}

export const database = new AppDatabase();
