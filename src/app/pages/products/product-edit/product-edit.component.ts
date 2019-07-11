import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  id: number;
  editMode = false;
  productForm: FormGroup;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
    ) { }

  ngOnInit() {

    
    this.initForm();
    console.log(this.getControls());

  }



  private initForm() {

    let productName = '';
    let productImagePath = '';
    let productDescription = '';
    let productTags = new FormArray([]);

    this.productForm = new FormGroup({
      'name': new FormControl(productName, Validators.required),
      'imagePath': new FormControl(productImagePath, Validators.required),
      'description': new FormControl(productDescription, Validators.required),
      'tags': productTags
    });

  }

  getControls() {
   return (<FormArray>this.productForm.get('tags')).controls;
  }

  onSubmit() {
    const newProduct = this.productForm.value;

    this.productService.addProduct(newProduct);

    this.onCancel();
  }

  addTags() {
    (<FormArray>this.productForm.get('tags')).push(
      new FormGroup({
        'tagName': new FormControl(null, Validators.required)
      })
    )
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
