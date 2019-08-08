import { Product } from './product.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
     providedIn: 'root' 
  })
export class ProductService {

ProductChanged = new Subject<Product[]>();
 

constructor(private http: HttpClient) {}

private products: Product[] = [];


storeProducts() {
this.http.put('https://businesscasual-2d842.firebaseio.com/products.json', this.products)
.subscribe(responseData => {
     console.log(responseData);
   });
}

fetchProducts() {

     return this.http
     .get<{[key: string]: Product}>(
         'https://businesscasual-2d842.firebaseio.com/products.json'
         )
         .pipe(
          map(responseData => {
          const postsArray: Product[] = [];
          for (const key in responseData) {
            if(responseData.hasOwnProperty(key)) {
              postsArray.push({...responseData[key]});
          }
          }
          return postsArray;
        })
        )
     }

     fetchedProducts() {
     this.fetchProducts()
     .subscribe( (response) => {
     this.products = response;
     this.ProductChanged.next(this.products.slice());
     })
     }

getproductImages() {
     const product = this.products;
     const productImages = [];
     const totalImages = product.length;
     for(let i = 0; i < totalImages; i++) {
          productImages.push(product[i].imagePath)
     }

     return productImages;
}


getProducts() {
    return this.products.slice();
}

getProduct(index: number) {
return this.products[index];
}


updateProduct(index: number, newProduct: Product) {
this.products[index] = newProduct;
this.ProductChanged.next(this.products.slice());
}


addProduct(product: Product) {
this.products.push(product);
this.ProductChanged.next(this.products.slice());
}

deleteProduct(index: number) {
     this.products.splice(index, 1);
     this.ProductChanged.next(this.products.slice());
}

}


