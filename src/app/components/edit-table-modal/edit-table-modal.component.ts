import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/global/http.service';
import { Book, Modal } from 'src/global/interfaces';
import { ModalService } from 'src/global/modal.service';
import { StorageService } from 'src/global/storage.service';

export const MODAL_NAME = 'EDIT-TABLE';
@Component({
  selector: 'app-edit-table-modal',
  templateUrl: './edit-table-modal.component.html',
  styleUrls: ['./edit-table-modal.component.scss'],
})
export class EditTableModalComponent implements OnInit {
  data = {} as Book;
  keys: string[] = ['author', 'epoch', 'genre', 'kind', 'title'];
  name = MODAL_NAME;

  constructor(
    private modalService: ModalService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.modalService.modalOpened.subscribe(() => {
      this.data = this.modalService.getModal(MODAL_NAME)?.data;
    });
  }

  save() {
    let data = JSON.parse(this.storageService.getStorage('data')!);

    //compare edited data with existing one
    data.forEach((book: Book) => {
      if (book.id === this.data.id) {
        for (const prop of Object.getOwnPropertyNames(book)) {
          if (book[prop] !== this.data[prop]) {
            book[prop] = this.data[prop];
          }
        }
      }
    });

    this.storageService.saveStorage('data', JSON.stringify(data));
    this.close();
  }

  close() {
    this.modalService.closeAllModals();
  }

  getName(name: string) {
    return this.modalService.getTableHeading(name);
  }
}
