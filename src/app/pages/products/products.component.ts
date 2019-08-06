import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
    ) { }

  ngOnInit() {
    this.productService.fetchedProducts();
  }

  onAddNewProduct() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
