import { ExpenseRecord } from "../models/expense-record.model";

export interface ExpensesResponse {
    records: ExpenseRecord[];
}