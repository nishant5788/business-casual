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
  page: number = 1;
  pageSize: number = this.page + 3;
  collectionSize: number;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // this.subscription = this.productService.ProductChanged.subscribe(
    //   (newProduct: Product[]) => {
    //     // this.products = newProduct;
    //     this.collectionSize = newProduct.length;
    //     const productSet = newProduct.slice(0,this.pageSize);
    //     this.products = productSet;
    //   }
    // );
    // this.products = this.productService.getProducts();

    if(!this.authStatusFromProduct) {
    this.onPaginate();
    }
    else {
    this.productService.ProductChanged.subscribe(
      res => {
        this.products = res;
      }
    );
  }
  }

  onPaginate() {
    let newPageSize = this.page * 3;
    let newPage = (this.page - 1) * 3;
    if(newPage < 0) {
      newPage = 0;
    }
    this.subscription = this.productService.fetchProducts().subscribe(
      (newProduct: Product[]) => {
        this.collectionSize = newProduct.length;
        const productSet = newProduct.slice(newPage, newPageSize);
        this.products = productSet;
      }
    );

    window.scrollTo({
      top: 150,
      left: 100,
      behavior: 'smooth'
    });

    // console.log("page is " + newPage);
    // console.log("pagesize is " + newPageSize);
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
