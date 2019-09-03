import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products/product.service';
import { Product } from '../products/product.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products = [];
  error: string = null;

  constructor(private productService: ProductService,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.productService.fetchProducts().subscribe(
        responseData => {
         this.products = responseData;
        },
        error => {
          this.error = "Products are not available to display!"
        }
      );
  }

}
