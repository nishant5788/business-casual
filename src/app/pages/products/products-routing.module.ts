import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { AuthGuard } from '../login/auth.guard';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsResolverService } from './products-resolver.service';
import { ProductSearchComponent } from './product-search/product-search.component';



const routes: Routes = [
    {path: '', component: ProductsComponent, data: { title: 'Products | Business Casual' }, children: [
      {path: 'new', component: ProductEditComponent, data: { title: 'Add New Product | Business Casual' }, canActivate: [AuthGuard]},
      {path: ':id', component: ProductDetailComponent, resolve: [ProductsResolverService], canActivate: [AuthGuard]},
      {path: ':id/edit', component: ProductEditComponent, data: { title: 'Edit Product | Business Casual' }, resolve: [ProductsResolverService], canActivate: [AuthGuard]}
    ]}
  ];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {

}