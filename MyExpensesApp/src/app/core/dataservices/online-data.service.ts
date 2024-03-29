import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OnlineDataService {
  constructor(public http: HttpClient) {}

  getEntities(url: string) {
    return this.http.get<unknown[]>(url);
  }

  saveEntity(url: string, entity: any) {
    return this.http.post(url, entity);
  }

  delete(url: string, entityId: string) {
    return this.http.delete(`${url}/${entityId}`);
  }
}
