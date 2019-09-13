import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../product.service';
import { FileUpload } from '../file-upload.model';
import { UploadFileService } from '../file-upload.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  id: number;
  editMode = false;
  productForm: FormGroup;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  productImgUrl: string = "assets/img/img-not-found.jpg";


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private UploadFileService: UploadFileService
    ) { }

    
    selectFile(event) {
      this.selectedFiles = event.target.files;
      console.log(this.selectedFiles);
      this.onUploadImg();
    }

    onUploadImg() {
      const file = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
  
      this.currentFileUpload = new FileUpload(file);
      this.UploadFileService.pushFileToStorage(this.currentFileUpload).subscribe(
        percentage => {
          this.percentage = Math.round(percentage);
          (<HTMLElement>document.querySelector('.product-thumb-progress')).classList.remove('d-none');
          (<HTMLElement>document.querySelector('.product-thumb-progress .progress-bar')).style.width = this.percentage + "%";

        },
        error => {
          console.log(error);
        }
      );

      this.UploadFileService.productImgUrl.subscribe(
        imgUrl => {
         this.productImgUrl = imgUrl;
         document.querySelector('.product-uploaded-thumb').classList.remove('d-none');
         this.productForm.patchValue({
          'imagePath': this.productImgUrl
         });
        }
      );

      
    }

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
    let productImagePath = this.productImgUrl;
    let productDescription = '';
    let productTags = new FormArray([]);
    let productDate = new Date();

    if(this.editMode) {
    const product = this.productService.getProduct(this.id);

    this.productImgUrl = product.imagePath;

    productName = product.name;
    productDescription = product.description;

    console.log(product.imagePath);

    for(let tag of product.tags) {
      productTags.push(new FormControl(tag))
    }

    document.querySelector('.product-uploaded-thumb').classList.remove('d-none');
    document.querySelector('.add-product-btn').classList.add('d-none');
    
    }

    else {
      document.querySelector('.add-product-btn').classList.remove('d-none');
    }

    

    this.productForm = new FormGroup({
      'name': new FormControl(productName, Validators.required),
      'imagePath': new FormControl(productImagePath),
      'description': new FormControl(productDescription, Validators.required),
      'date': new FormControl(productDate),
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
    document.querySelector('.add-product-btn').classList.remove('d-none');
  }

  onDeleteTag(index: number) {
    (<FormArray>this.productForm.get('tags')).removeAt(index);
  }

  

}
