import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CloudService } from 'src/app/services/cloud.service';

@Injectable({
    providedIn: 'root',
  })
export class OnlineDataService {
  constructor(public http: HttpClient, public cloudService: CloudService) {}

  saveEntity(url: string, entity: any) {
    return this.http.post(url, entity);
  }

  async delete(url: string, entity: any) {
    const apiUrl = await this.cloudService.getApiUrl();
    return this.http.delete(`${url}/${entity.id}`);
  }
}
