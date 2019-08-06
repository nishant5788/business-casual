import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';
import { loginService } from '../login/login.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private loginService: loginService
    ) { }

  ngOnInit() {
    this.productService.fetchedProducts();
    this.userSubscription = this.loginService.user
      .subscribe(
        user => {
          this.isAuthenticated = !user? false : true;
        }
      );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onAddNewProduct() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
