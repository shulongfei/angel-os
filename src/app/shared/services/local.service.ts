import { Injectable } from '@angular/core';
import { BaseStorage } from './base-storage';

@Injectable({
  providedIn: 'root'
})
export class LocalService extends BaseStorage {
  _storage = window.localStorage
}
