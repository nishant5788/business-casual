import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { StoreComponent } from './pages/store/store.component';
import { ProductsComponent } from './pages/products/products.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductEditComponent } from './pages/products/product-edit/product-edit.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './pages/login/auth.guard';
import { ProductsResolverService } from './pages/products/products-resolver.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'products', component: ProductsComponent, children: [
    {path: 'new', component: ProductEditComponent, canActivate: [AuthGuard]},
    {path: ':id', component: ProductDetailComponent, resolve: [ProductsResolverService], canActivate: [AuthGuard]},
    {path: ':id/edit', component: ProductEditComponent, resolve: [ProductsResolverService], canActivate: [AuthGuard]}
  ]},
  {path: 'store', component: StoreComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
