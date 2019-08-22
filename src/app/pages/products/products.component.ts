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
  totalAvailableProducts: number;
  private userSubscription: Subscription;
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

  
    // ngAfterViewInit() {
    //   let loadedProductsPage = this.route.snapshot.queryParamMap.get('page'); 
    //   this.page = loadedProductsPage;
    //   console.log("loadedProductsPage is " + loadedProductsPage);
    // }
    

  ngOnInit() {
    this.userSubscription = this.loginService.user
      .subscribe(
        user => {
          this.isAuthenticated = !user? false : true;
        }
      );

      this.onPaginate();
  }

  onAddNewProduct() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onPaginate() {
    let lastProduct = this.page * this.pageSize;
    let firstProduct = (this.page - 1) * this.pageSize;

    // if(this.page !== 1) {
    // this.router.navigate(['/products'], {queryParams: {page: this.page}});
    // }
    // else {
    //   this.router.navigate(['/products'], {queryParams: {page: null}});
    // }

    this.productFetchSubscription = this.productService.fetchProducts().subscribe(
      (newProduct: Product[]) => {
        this.fetchSuccess(firstProduct, lastProduct, newProduct);
      },
        errorMsg => {
          this.fetchFailure(errorMsg);
      }
    );

    this.productChangeSubscription = this.productService.ProductChanged.subscribe(
      (newProduct: Product[]) => {

        this.fetchSuccess(firstProduct, lastProduct, newProduct);
      },
        errorMsg => {
          this.fetchFailure(errorMsg);
      }
    );
    
  }


  fetchSuccess(firstProduct, lastProduct, newProduct) {
    this.isLoading = false;
    this.collectionSize = newProduct.length;
    const productSet = newProduct.slice(firstProduct, lastProduct);
    this.products = productSet;
  }

  fetchFailure(errorMsg) {
    this.error = errorMsg.statusText;
    this.isLoading = false;
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


  ngOnDestroy() {
    this.productFetchSubscription.unsubscribe();
    this.productChangeSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
