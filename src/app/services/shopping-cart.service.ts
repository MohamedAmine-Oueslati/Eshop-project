import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cart:Observable<Cart[]>

  constructor(private firestore:AngularFirestore) {
    this.cart = this.firestore.collection('ShoppingCart').snapshotChanges().pipe(map(actions =>  {
      return (actions.map(b => {
        const data = b.payload.doc.data()
        const id = b.payload.doc.id
        return {data,id}
      })
      )
    }))
   }

  create() {
    return this.firestore.collection('ShoppingCart').add({dateCreated: new Date().getTime()})
  }

  private getOrCreate() {
    let cartId = localStorage.getItem('cartId')
    if (cartId) return cartId
      this.create()
      this.cart.subscribe(res => {
        localStorage.setItem('cartId', res[0]['id']);
        return res[0]['id']
      })
    }

}
