import Dexie, { Table } from 'dexie';
import { ActionType } from './change-type';

export interface Unsynchronized {
  id: number,
  recordId: string,
  table: string,
  changeType: ActionType
}

export interface Shopping {
  id: string;
  creationDate: Date;
  lastModDate: Date;
  effectiveDate: Date;
  name: string;
  total: number;
  details: ShoppingDetail[];
}

export interface ShoppingDetail {
  id: string,
  shoppingId: string;
  name: string,
  brand: string,
  store: string,
  unitPrice: number,
  quantity: number,
  totalAmount?: number,
  onCar: boolean,
  image?: string
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  image?: string;
}

export interface Store {
  id: string;
  creationDate: Date;
  lastModDate: Date;
  name: string;
}

export class AppDatabase extends Dexie {
  unsynchronizedRecords: Table<Unsynchronized, number>
  shoppings: Table<Shopping, number>;
  products: Table<Product, number>;
  stores: Table<Store, number>;

  constructor() {
    super('MyExpensesApp');
    this.version(1).stores({
      unsynchronizedRecords: 'id,recordId,table',
      shoppings: 'id',
      products: 'id',
      stores: 'id',
    });
  }
}

export const database = new AppDatabase();
