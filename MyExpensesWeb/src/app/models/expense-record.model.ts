import { BaseRecord } from "./base-record.model";

export class ExpenseRecord extends BaseRecord {
    Period: Date;
    Rent: number;
    PaidTv: number;
    Water: number;
    Electricity: number;
    Gas: number;
    
    get Total(): number {
        return this.Rent + this.PaidTv + this.Water + this.Electricity + this.Gas
    }
}