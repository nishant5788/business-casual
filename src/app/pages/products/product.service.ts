import { Product } from './product.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators'

@Injectable({
     providedIn: 'root' 
  })
export class ProductService {

ProductChanged = new Subject<Product[]>();
 

constructor(private http: HttpClient) {}

// private products: Product[] = [
//      new Product(
//       'COFFEES & TEAS',
//       ['BLENDED TO PERFECTION'],
//        'assets/img/products-01.jpg',
//        'We take pride in our work, and it shows. Every time you order a beverage from us, we guarantee that it will be an experience worth having. Whether it is our world famous Venezuelan Cappuccino, a refreshing iced herbal tea, or something as simple as a cup of speciality sourced black coffee, you will be coming back for more'
//      ),
  
//      new Product(
//       'BAKERY & KITCHEN',
//       ['DELICIOUS TREATS', 'GOOD EATS'],
//        'assets/img/products-02.jpg',
//        'Our seasonal menu features delicious snacks, baked goods, and even full meals perfect for breakfast or lunchtime. We source our ingredients from local, oragnic farms whenever possible, alongside premium vendors for specialty goods.'
//      ),
  
//      new Product(
//       'BULK SPECIALITY BLENDS',
//       ['FROM AROUND THE WORLD'],
//        'assets/img/products-03.jpg',
//        'Travelling the world for the very best quality coffee is something take pride in. When you visit us, you will always find new blends from around the world, mainly from regions in Central and South America. We sell our blends in smaller to large bulk quantities. Please visit us in person for more details.'
//      )
//   ];

private products: Product[] = [];

getProducts() {
    return this.products.slice();
}

getProduct(index: number) {
return this.products[index];
}

storeProducts() {
     const products = this.getProducts();
     this.http.put('https://businesscasual-2d842.firebaseio.com/products.json', products).subscribe();
     }


     fetchProducts() {
          return this.http
          .get<Product[]>('https://businesscasual-2d842.firebaseio.com/products.json')
          .pipe(
               map(products => {
               return products.map((product) => {
                    return {...product, tags: product.tags ? product.tags : []};
               });
          }),
          tap(fetchedProducts => {
               this.products = fetchedProducts;
               this.ProductChanged.next(this.products.slice());
          })
          )
     }

addProduct(product: Product) {
this.products.push(product);
this.ProductChanged.next(this.products.slice());
}

updateProduct(index: number, newProduct: Product) {
     this.products[index] = newProduct;
     this.ProductChanged.next(this.products.slice());
     }

deleteProduct(index: number) {
     this.products.splice(index, 1);
     this.ProductChanged.next(this.products.slice());
}

}


