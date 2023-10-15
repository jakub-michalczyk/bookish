import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/global/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input()
  name = '';
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  get isOpened() {
    return this.modalService.modals.find((modal) =>
      modal.name === this.name ? (modal.active ? true : false) : null
    );
  }
}
