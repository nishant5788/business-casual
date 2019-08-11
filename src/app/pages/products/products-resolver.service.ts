import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Injectable({
    providedIn: 'root'
})
export class ProductsResolverService implements Resolve<Product[]> {

    constructor(private productService: ProductService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.productService.fetchProducts(); 
    }

}