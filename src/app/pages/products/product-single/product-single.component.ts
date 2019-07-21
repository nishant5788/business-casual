import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/common/modal/modal.component';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {

  @Input('productSingle') product: Product;
  @Input('productSingleID') id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
  }

  openDeleteModal() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.modalTitle = 'Are you sure you want to Delete?';
    modalRef.componentInstance.modalID = this.id;
  }


  onEditProduct() {
    this.router.navigate([this.id + '/edit'], {relativeTo: this.route});
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: 'smooth'
    });

  }

  onDeleteProduct(){
    this.productService.deleteProduct(this.id);
  }

}
