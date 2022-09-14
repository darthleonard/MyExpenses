import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ExpensesResponse } from '../interfaces/expenses.response';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {
  private baseUrl = 'http://localhost/api';

  constructor(private http: HttpClient) { }

  getConsumptions(): Observable<ExpensesResponse> {
    return this.http.get<ExpensesResponse>(`${ this.baseUrl }/consumption/read.php`);
  }
}
