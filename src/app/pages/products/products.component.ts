import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';
import { loginService } from '../login/login.service';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  isLoading = true;
  error = null;
  products: Product[];
  totalAvailableProducts: Product[];
  showPagination = true;
  userSubscription: Subscription;
  productFetchSubscription: Subscription;
  productChangeSubscription: Subscription;
  page: any = 1;
  pageSize: number = 3;
  collectionSize: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private loginService: loginService,
    ) {}

  ngOnInit() {
    
    this.userSubscription = this.loginService.user
      .subscribe(
        user => {
          this.isAuthenticated = !user? false : true;
        }
      );

      this.productFetchSubscription = this.productService.fetchProducts().subscribe(
        (newProduct: Product[]) => {
          this.totalAvailableProducts = newProduct;
          this.paginatedProducts(newProduct);
        },
        errorMsg => {
        this.fetchFailure(errorMsg);
          }
      );

      this.productChangeSubscription = this.productService.ProductChanged.subscribe(
        (newProduct: Product[]) => {
          this.paginatedProducts(newProduct);
        },
        errorMsg => {
        this.fetchFailure(errorMsg);
          }

      );
  }

  paginatedProducts(incomingProducts: Product[]) {
    let start = (this.page - 1) * this.pageSize;  
    let end = this.page * this.pageSize;
    if(incomingProducts.length < this.pageSize + 1) {
      this.showPagination = false;
    }
    else {
      this.showPagination = true;
    }
    this.fetchSuccess(start, end, incomingProducts);
  }

  onPaginate() {
    this.paginatedProducts(this.totalAvailableProducts);
  }

  fetchSuccess(start, end, incomingProducts) {
    this.isLoading = false;
    this.collectionSize = incomingProducts.length;
    let productSet = incomingProducts.slice(start, end);
    this.products = productSet;
  }

  fetchFailure(errorMsg) {
    this.isLoading = false;
    this.error = errorMsg.statusText;
  }

  productSort(sortValue: string) {
    if(sortValue === 'mostRecent') {
      this.products.sort(function(a,b): any {
        let bDate: any = new Date(b.date);
        let aDate: any = new Date(a.date);
        let sortedOutput: any = bDate - aDate
        return sortedOutput;
      });
    }

    if(sortValue === 'productName') {
      this.products.sort(function(a,b) {
        let textA = a.name.toUpperCase();
        let textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
    }
  }

  availableProducts() {
    return this.products;
  }

  onAddNewProduct() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.productFetchSubscription.unsubscribe();
    this.productChangeSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
