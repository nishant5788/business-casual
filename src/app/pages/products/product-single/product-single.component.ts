import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {

  @Input('productSingle') product: Product;
  @Input('productSingleID') id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
  }


  onEditProduct() {
    this.router.navigate([this.id + '/edit'], {relativeTo: this.route});
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: 'smooth'
    });

  }

}
