import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { debug } from 'util';

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


    onSubmit() {
      const newProduct = this.productForm.value;
  
      if(this.editMode) {
        this.productService.updateProduct(this.id, newProduct);
      }
      else {
      this.productService.addProduct(newProduct);
    }
      this.onCancel();
      this.productService.storeProducts();
    }

  ngOnInit() {
    this.route.params.
    subscribe(
      (params: Params)=> {
        this.id = +params['id']
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )    
  }

  private initForm() {

    let productName = '';
    let productImagePath = '';
    let productDescription = '';
    let productTags = new FormArray([]);

    if(this.editMode) {
    const product = this.productService.getProduct(this.id);

    productName = product.name;
    productImagePath = product.imagePath;
    productDescription = product.description;

    for(let tag of product.tags) {
      productTags.push(new FormControl(tag))
    }

    }

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

  addTags() {
    const formTag = new FormControl(null, Validators.required);

    (<FormArray>this.productForm.get('tags')).push(formTag);
  }

  onCancel() {
    this.router.navigate(['/products']);
  }

  onDeleteTag(index: number) {
    (<FormArray>this.productForm.get('tags')).removeAt(index);
  }

  

}
