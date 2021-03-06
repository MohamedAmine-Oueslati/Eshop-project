import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from '../models/cart.model';
import 'rxjs/add/operator/take'


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cart: Observable<Cart[]>

  constructor(private firestore: AngularFirestore) {
    this.cart = this.firestore.collection('ShoppingCart').valueChanges({ idField: 'id' })
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
  
  create() {
    return this.firestore.collection('ShoppingCart').add({ dateCreated: new Date().getTime() })
  }
  
  getCart() {
    let id = this.getOrCreate()
    return this.firestore.collection('ShoppingCart').doc(id).collection('items').valueChanges({ idField: 'id1' })
  }

  addProduct(product) {
    let id = this.getOrCreate()
    return this.firestore.collection('ShoppingCart').doc(id).collection('items').add(product)
  }

  updateCart(idSub,product) {
    let id = this.getOrCreate()
    this.firestore.doc(`ShoppingCart/${id}/items/${idSub}`).update(product)
  }

  clearCart() {
    let id = this.getOrCreate()
    this.getCart().take(1).subscribe(data => {
      data.forEach(p => {
        this.firestore.doc(`ShoppingCart/${id}/items/${p.id1}`).delete()
      });
    })
  }

  addCart(product,j) {
    let count = 0
    this.getCart().take(1).subscribe(data => {
      // add the subCollection 'Items' if it doesn't exist
      if(data.length === 0) {
        product['quantity'] = 0
        this.addProduct(product)
      }
      else {
        // increase or decrease the quantity of an existing product
      data.forEach(p => {
        if (p.title === product.title) {
          if (j === 1) {
            this.updateCart(p['id1'],{quantity : p.quantity + 1})
          }
          else if (j=== -1 && p.quantity > 1) {
            this.updateCart(p['id1'],{quantity : p.quantity - 1})
          }
          else if(j === -1 && p.quantity === 1) {
            this.updateCart(p['id1'],{quantity : p.quantity - 1})
            let id = this.getOrCreate()
            this.firestore.doc(`ShoppingCart/${id}/items/${p.id1}`).delete()
          }
          count++
        }
      })
      // add a product if it doesn't exist
      if (count === 0) {
        product['quantity'] = 0
        this.addProduct(product)
      }
    }
    })
  }
}
