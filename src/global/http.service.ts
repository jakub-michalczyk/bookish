import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url = 'https://wolnelektury.pl/api/books/';

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this.url);
  }
}
