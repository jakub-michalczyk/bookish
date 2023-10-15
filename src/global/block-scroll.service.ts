import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlockScrollService {
  constructor() {}

  block() {
    document.body.classList.add('block-scroll');
  }

  unblock() {
    document.body.classList.remove('block-scroll');
  }
}
