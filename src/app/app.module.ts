import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CustomFormsModule } from 'ng2-validation';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// import {DataTableModule} from 'angular-4-data-table';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    ProductsComponent,
    OrdersComponent,
    ManageProductsComponent,
    NewProductComponent,
    ProductQuantityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    AppRoutingModule,
    NgbModule,
    // DataTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    // AngularFirestore,
    AngularFirestoreModule,
    RouterModule.forRoot([
      {path: '' , component: HomeComponent },
      {path: 'ShoppingCart' , component: ProductsComponent },
      {path: 'Login' , component: LoginComponent },
      // {path: 'Products' , component: ProductsComponent  },
      {path: 'Orders' , component: OrdersComponent},
      {path: 'ManageProducts/New' , component: NewProductComponent,canActivate: [AuthGuardService]},
      {path: 'ManageProducts/:id' , component: NewProductComponent,canActivate: [AuthGuardService]},
      {path: 'ManageProducts' , component: ManageProductsComponent,canActivate: [AuthGuardService]}
    ])
  ],
  providers: [AuthService, AuthGuardService, CategoryService, ProductService, UserService, ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
