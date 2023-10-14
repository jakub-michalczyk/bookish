import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/global/interfaces';
import { BOOKS } from 'src/global/books';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  constructor(private router: Router) {}

  books: Book[] = BOOKS;

  getBookUrl(bookData: Book) {
    return `${bookData.author.replace(/\s/g, '_')}-${bookData.title.replace(
      /\s/g,
      '_'
    )}`;
  }

  navigateWithState(book: Book) {
    this.router.navigate([
      `/details/${this.getBookUrl(book)}`,
      {
        id: book.id,
      },
    ]);
  }
}
