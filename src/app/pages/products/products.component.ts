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
  isLoading = false;
  error = null;
  products: Product[];
  private userSubscription: Subscription;
  subscription: Subscription;
  page: number = 1;
  pageSize: number = this.page + 3;
  collectionSize: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private loginService: loginService
    ) { }

  ngOnInit() {
    // this.productService.fetchProducts().subscribe(
    //   resData => {
    //     this.isLoading = false;
    //     this.products = resData;
    //   },
    //   errorMsg => {
    //     this.error = errorMsg.statusText;
    //     this.isLoading = false;
    //   }
    // );
    this.userSubscription = this.loginService.user
      .subscribe(
        user => {
          this.isAuthenticated = !user? false : true;
        }
      );

      if(!this.isAuthenticated) {
        this.onPaginate();
        }
        else {
        this.productService.fetchProducts().subscribe(
          res => {
            this.products = res;
          }
        );
      }
  }

  onAddNewProduct() {
    this.router.navigate(['new'], {relativeTo: this.route});
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
    
  }

  productSort(value:string) {
    console.log(value);
  }

  sortByDate() {
    // this.products.sort(function(a,b){
    //   let bDate: Date = new Date(b.date);
    //   let aDate: Date = new Date(a.date);
    //   return bDate - aDate;
    // });
  }

  availableProducts() {
    return this.products;
  }


  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
