import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CloudService {
  private readonly cloudSubject = new BehaviorSubject(false);
  private readonly onlineSubject = new BehaviorSubject(false);
  private _cloudEnabled: boolean;
  private apiUrl: string;

  constructor(private http: HttpClient, private storage: StorageService) {
    this.init();
  }

  cloudEnabled$ = this.cloudSubject.asObservable();

  get cloudEnabled() {
    return this._cloudEnabled;
  }

  set cloudEnabled(cloudEnabled: boolean) {
    this._cloudEnabled = cloudEnabled;
    this.cloudSubject.next(this._cloudEnabled);
    this.reachApi();
  }

  get online() {
    return this.cloudSubject.getValue() && this.onlineSubject.getValue();
  }

  setCloudEnabled(enabled: boolean) {
    this.cloudSubject.next(enabled);
    this.loadApiUrl();
    this.reachApi();
  }

  async getApiUrl() {
    return this.apiUrl || (await this.loadApiUrl());
  }

  private init() {
    this.storage.get('cloudEnabled').then((r) => this.setCloudEnabled(r));
  }

  private async loadApiUrl() {
    const storedConfig = await this.storage.get('config');
    if (!storedConfig) {
      return;
    }
    const config = JSON.parse(storedConfig);
    this.apiUrl = `${config.method}://${config.url}:${config.port}/api`;
    return this.apiUrl;
  }

  private async reachApi() {
    if (!this.cloudSubject.getValue()) {
      return;
    }

    this.http
      .get(`${await this.getApiUrl()}/cloud`, { observe: 'response' })
      .subscribe(
        (response) => this.onlineSubject.next(response.status === 200),
        (error) => this.onlineSubject.next(false)
      );
  }
}
