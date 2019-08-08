import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[];
  subscription: Subscription;
  @Input() authStatusFromProduct: boolean;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.ProductChanged.subscribe(
      (newProduct: Product[]) => {
        this.products = newProduct;
      }
    );
    this.products = this.productService.getProducts();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
