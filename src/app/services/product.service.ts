import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product.model';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Observable<Product[]>

  constructor(private firestore:AngularFirestore) {
    this.products = this.firestore.collection('Product').valueChanges({ idField: 'id' })
   }
  create(product) {
    return this.firestore.collection('Product').add(product)
  }

  update(id,product) {
    this.firestore.doc(`Product/${id}`).update(product)
  }

  delete(id) {
    this.firestore.doc(`Product/${id}`).delete()
  }
}
