import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BodyContentComponent } from './layout/body-content/body-content.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { StoreComponent } from './pages/store/store.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductEditComponent } from './pages/products/product-edit/product-edit.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductSingleComponent } from './pages/products/product-single/product-single.component';
import { SiteNavigationComponent } from './common/site-navigation/site-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    BodyContentComponent,
    AboutComponent,
    HomeComponent,
    PageNotFoundComponent,
    StoreComponent,
    ProductsComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductSingleComponent,
    SiteNavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
