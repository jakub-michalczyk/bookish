import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/global/http.service';
import { Book } from 'src/global/interfaces';

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
  _currentPage = 1;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getData().subscribe((data) => {
      this.data = data as Book[];
    });
  }

  getRow(page: number) {
    //for first page we slice first five elements, than we end slicing every fifth element
    return page === 1
      ? this.data?.slice(0, 5)
      : this.data?.slice(page * 5, page * 5 + 5);
  }

  getTableHeading(heading: string) {
    return heading === 'simple_thumb'
      ? 'Cover'
      : `${heading[0].toUpperCase()}${heading.slice(1)}`;
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

  get calculatePagination() {
    //calculating the maximum possible page for our data
    return this.data?.length % 5 === 0
      ? this.data?.length / 5
      : Math.floor(this.data?.length / 5) + 1;
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(value: number) {
    this._currentPage = value;
  }
}
