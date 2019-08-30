import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../products/product.service';
import { Product } from '../products/product.model';

@Component({

  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']

})

export class SearchComponent implements OnInit {

  products: Product[]
  searchResults: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
    ) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.route.queryParams.

    subscribe(

      (params: Params)=> {
        let queryVal = params['query'];
        let searchHolder = [];
        let queryPattern = new RegExp(queryVal, 'i');
        this.products.forEach(function (current) {

    if (current.name.match(queryPattern) && queryVal) {
      searchHolder.push(current);
    }

});

this.searchResults = searchHolder;

      }

    );
  }
}