import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/global/http.service';
import { Book } from 'src/global/interfaces';
import { ModalService } from 'src/global/modal.service';
import { MODAL_NAME } from '../edit-table-modal/edit-table-modal.component';
import { StorageService } from 'src/global/storage.service';

@Component({
  selector: 'app-all-data-page',
  templateUrl: './all-data-page.component.html',
  styleUrls: ['./all-data-page.component.scss'],
})
export class AllDataPageComponent implements OnInit {
  tableFields: string[] = [
    'simple_thumb',
    'author',
    'title',
    'genre',
    'epoch',
    'kind',
  ];
  data: Book[] = [];
  filteredData: Book[] = [];
  _currentPage = 1;
  _pagination = 0;
  modalName = MODAL_NAME;

  constructor(
    private httpService: HttpService,
    private modalService: ModalService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    //check whether we have data stored in localstorage or we need to fetch it
    if (this.storageService.getStorage('data') === null) {
      this.httpService.getData().subscribe((data) => {
        this.data = data as Book[];
        this.prepareData();
        this.storageService.saveStorage('data', JSON.stringify(this.data));
        this.addPagination(this.data);
      });
    } else {
      this.data = JSON.parse(this.storageService.getStorage('data')!);
      this.addPagination(this.data);
    }
  }

  addPagination(data: Book[]) {
    //calculate maximum possible page for pagination
    this.calculatePagination =
      data?.length % 5 === 0
        ? data?.length / 5
        : Math.floor(data?.length / 5) + 1;
  }

  prepareData() {
    //api doesn't provide any identification for the data so i'm adding it myself
    let index = 0;
    this.data.forEach((book) => {
      book.id = index++;
    });

    index = 0;
  }

  getRow(page: number) {
    //for first page we slice first five elements, than we end slicing every fifth element
    return this.filteredData.length === 0
      ? page === 1
        ? this.data?.slice(0, 5)
        : this.data?.slice(page * 5, page * 5 + 5)
      : page === 1
      ? this.filteredData?.slice(0, 5)
      : this.filteredData?.slice(page * 5, page * 5 + 5);
  }

  getName(name: string) {
    return this.modalService.getTableHeading(name);
  }

  updatePage(addition = false) {
    //condition to check whether we want to go to a page below 1 or above the maximum page
    if (
      !addition
        ? this.currentPage - 1 <= 0
        : false || this.currentPage + 1 > this.calculatePagination
    ) {
      return;
    }

    addition
      ? (this.currentPage = this.currentPage + 1)
      : (this.currentPage = this.currentPage - 1);
  }

  searchQuery(elem: EventTarget | null) {
    let val = (elem as HTMLInputElement).value.toLowerCase();

    val === '' ? this.restoreDefaultData() : null;

    //check whether book author or title includes search query
    this.filteredData = this.data.filter((book) => {
      return (
        book.author.toLowerCase().includes(val) ||
        book.title.toLowerCase().includes(val)
      );
    });

    //limit page
    this.addPagination(this.filteredData);
  }

  restoreDefaultData() {
    this.filteredData = [];
  }

  editRow(row: Book) {
    this.modalService.openModal(MODAL_NAME, row);
  }

  set calculatePagination(value: number) {
    this._pagination = value;
  }

  get calculatePagination() {
    return this._pagination;
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(value: number) {
    this._currentPage = value;
  }
}
