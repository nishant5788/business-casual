import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/pages/products/product.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() modalTitle;
  @Input() modalID: number;

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    ) { }

  ngOnInit() {
  }


  onDeleteProduct() {
    this.productService.deleteProduct(this.modalID);
 
  }

}
