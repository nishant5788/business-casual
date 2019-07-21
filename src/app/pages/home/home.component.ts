import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sliderImages = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.sliderImages = this.productService.getproductImages();
  }

}
