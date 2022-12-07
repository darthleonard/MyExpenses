import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  private source = new BehaviorSubject(false);
  private _cloudEnabled: boolean;

  constructor(private storage: StorageService) {
    this.init();
  }

  cloudEnabled$ = this.source.asObservable();

  get cloudEnabled() {
    return this._cloudEnabled;
  }

  set cloudEnabled(cloudEnabled: boolean) {
    this._cloudEnabled = cloudEnabled;
    this.source.next(this._cloudEnabled);
    // TODO: check if api is reachable
  }

  setCloudEnabled(enabled: boolean) {
    this.source.next(enabled);
  }

  private init() {
    this.storage.get('cloudEnabled').then(r => this.setCloudEnabled(r));
  }
}
