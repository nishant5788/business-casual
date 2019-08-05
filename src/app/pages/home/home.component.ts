import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products/product.service';
import { Product } from '../products/product.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products = {};

  constructor(private productService: ProductService,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.products = this.productService.getProducts();

    this.http.get('https://businesscasual-2d842.firebaseio.com/products.json')
    .subscribe(
      responseData => {
       this.products = responseData;
      }
    );
  }

}
