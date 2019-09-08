import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { StoreComponent } from './pages/store/store.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './pages/login/auth.guard';
import { ProductSearchComponent } from './pages/products/product-search/product-search.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: { title: 'Welcome to Business Casual' }},
  {path: 'about', component: AboutComponent, data: { title: 'About us | Business Casual' } },
  {path: 'store', component: StoreComponent, data: { title: 'Store | Business Casual' }},
  {path: 'login', component: LoginComponent, data: { title: 'Login | Business Casual' }},
  {path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard | Business Casual' }, canActivate: [AuthGuard]},
  {path: 'not-found', component: PageNotFoundComponent, data: { title: 'Page Not Found | Business Casual' } },
  {path: 'search', component: ProductSearchComponent, data: { title: 'Search | Business Casual' }},
  // {path: 'products', loadChildren: './pages/products/products.module#ProductsModule'},
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
