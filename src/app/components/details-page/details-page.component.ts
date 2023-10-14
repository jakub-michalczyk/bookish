import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BOOKS } from 'src/global/books';
import { Book } from 'src/global/interfaces';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent {
  books: Book[] = BOOKS;
  bookData = {} as Book | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.bookData = this.books.find(
      (book) => book.id === Number(this.route.snapshot.params['id'])
    );
  }
}
