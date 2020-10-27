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
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { OrdersComponent } from './orders/orders.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { NewProductComponent } from './new-product/new-product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    ProductsComponent,
    OrdersComponent,
    ManageProductsComponent,
    NewProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    // AngularFirestore,
    AngularFirestoreModule,
    RouterModule.forRoot([
      {path: '' , component: HomeComponent },
      {path: 'Login' , component: LoginComponent },
      {path: 'Products' , component: ProductsComponent,canActivate: [AuthGuardService]  },
      {path: 'Orders' , component: OrdersComponent},
      {path: 'ManageProducts/New' , component: NewProductComponent,canActivate: [AuthGuardService]},
      {path: 'ManageProducts/:id' , component: NewProductComponent,canActivate: [AuthGuardService]},
      {path: 'ManageProducts' , component: ManageProductsComponent,canActivate: [AuthGuardService]}
    ])
  ],
  providers: [AuthService, AuthGuardService, CategoryService, ProductService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
