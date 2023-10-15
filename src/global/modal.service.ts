import { Injectable } from '@angular/core';
import { Modal } from './interfaces';
import { Subject } from 'rxjs';
import { BlockScrollService } from './block-scroll.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modals: Modal[] = [];
  modalOpened = new Subject();

  constructor(private blockScrollService: BlockScrollService) {}

  openModal(modalName: string, data: any) {
    //register added modal
    this.registerModal(modalName, data);
    this.modals.forEach((modal) =>
      modal.name === modalName ? (modal.active = true) : null
    );
    this.modalOpened.next();
    this.blockScrollService.block();
  }

  closeAllModals() {
    //we have only one modal across the page, so for now I implemented only fnc for closing all the modals in the same time
    this.modals.forEach((modal) => (modal.active = false));
    this.blockScrollService.unblock();
    this.modals = [];
  }

  registerModal(modalName: string, data: any) {
    this.modals.push({
      name: modalName,
      data: data,
      active: false,
    });
  }

  getModal(name: string) {
    return this.modals.find((modal) => modal.name === name);
  }

  getTableHeading(heading: string) {
    return heading === 'simple_thumb'
      ? 'Cover'
      : `${heading[0].toUpperCase()}${heading.slice(1)}`;
  }
}
