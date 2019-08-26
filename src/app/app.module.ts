import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { ProductService } from './pages/products/product.service';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { ShortenPipe } from './common/shorten.pipe';
import { ProductFilter } from './pages/products/product-filter.pipe';
import { ModalComponent } from './common/modal/modal.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoaderComponent } from './common/loader/loader.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyContentComponent,
    AboutComponent,
    HomeComponent,
    PageNotFoundComponent,
    StoreComponent,
    ProductsComponent,
    ProductEditComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductSingleComponent,
    SiteNavigationComponent,
    ShortenPipe,
    ProductFilter,
    ModalComponent,
    LoginComponent,
    DashboardComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  entryComponents: [
    ModalComponent
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
