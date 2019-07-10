import { Product } from './product.model';
import { Subject } from 'rxjs';


export class ProductService {

     ProductChanged = new Subject<Product[]>();

private products: Product[] = [
   new Product(
    'COFFEES & TEAS',
    ['BLENDED TO PERFECTION'],
     'assets/img/products-01.jpg',
// tslint:disable-next-line: max-line-length
     'We take pride in our work, and it shows. Every time you order a beverage from us, we guarantee that it will be an experience worth having. Whether it is our world famous Venezuelan Cappuccino, a refreshing iced herbal tea, or something as simple as a cup of speciality sourced black coffee, you will be coming back for more'
   ),

   new Product(
    'BAKERY & KITCHEN',
    ['DELICIOUS TREATS', 'GOOD EATS'],
     'assets/img/products-02.jpg',
// tslint:disable-next-line: max-line-length
     'Our seasonal menu features delicious snacks, baked goods, and even full meals perfect for breakfast or lunchtime. We source our ingredients from local, oragnic farms whenever possible, alongside premium vendors for specialty goods.'
   ),

   new Product(
    'BULK SPECIALITY BLENDS',
    ['FROM AROUND THE WORLD'],
     'assets/img/products-03.jpg',
// tslint:disable-next-line: max-line-length
     'Travelling the world for the very best quality coffee is something take pride in. When you visit us, you will always find new blends from around the world, mainly from regions in Central and South America. We sell our blends in smaller to large bulk quantities. Please visit us in person for more details.'
   )

];


getProducts() {
    return this.products.slice();
}


addProduct(product: Product) {
this.products.push(product);
this.ProductChanged.next(this.products.slice());
}


}


