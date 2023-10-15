import { Injectable } from '@angular/core';
import { Book } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveStorage(key: string, data: string) {
    window.localStorage.setItem(key, data);
  }

  getStorage(key: string) {
    return window.localStorage.getItem(key);
  }
}
