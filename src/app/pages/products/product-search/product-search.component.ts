import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  products: Product[]
  searchResults: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
    ) { }

  ngOnInit() {
//     this.products = this.productService.getProducts();
    this.productService.fetchProducts()
    .subscribe(
      res => {
        this.products = res;
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
    );




    
  }

}
