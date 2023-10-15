import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.scss'],
})
export class OffcanvasComponent {
  closed = true;

  offcanvasToggle() {
    this.closed = !this.closed;
  }
}
