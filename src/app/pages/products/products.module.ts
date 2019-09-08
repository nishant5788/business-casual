import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './products.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductSingleComponent } from './product-single/product-single.component';
import { LoaderComponent } from 'src/app/common/loader/loader.component';
import { ShortenPipe } from 'src/app/common/shorten.pipe';
import { RouterModule } from '@angular/router';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductFilter } from './product-filter.pipe';


@NgModule({
    declarations: [
        ProductsComponent,
        ProductEditComponent,
        ProductDetailComponent,
        ProductListComponent,
        ProductSingleComponent, 
        LoaderComponent,
        ShortenPipe,
        ProductFilter
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        ProductsRoutingModule,
        NgbModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireStorageModule,
      ],
    exports: [
        ProductsComponent,
        ProductEditComponent,
        ProductDetailComponent,
        ProductListComponent,
        ProductSingleComponent
    ]
})
export class ProductsModule {}