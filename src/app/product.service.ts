import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Observable<Product[]>

  constructor(private firestore:AngularFirestore) {
    this.products = this.firestore.collection('Product').valueChanges()
   }

  create(product) {
    return this.firestore.collection('Product').add(product)
  }

  getAll() {
    return this.products
  }
}
