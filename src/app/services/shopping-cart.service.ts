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
  cart1: Observable<Cart[]>

  constructor(private firestore: AngularFirestore) {
    this.cart = this.firestore.collection('ShoppingCart').snapshotChanges().pipe(map(actions => {
      return (actions.map(b => {
        const data = b.payload.doc.data()
        const id = b.payload.doc.id
        return { data, id }
      })
      )
    }))
  }

  create() {
    return this.firestore.collection('ShoppingCart').add({ dateCreated: new Date().getTime() })
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

  getCart() {
    let id = this.getOrCreate()
    this.cart1 = this.firestore.collection('ShoppingCart').doc(id).collection('items').snapshotChanges().pipe(map(actions => {
      return (actions.map(b => {
        const data = b.payload.doc.data()
        const id1 = b.payload.doc.id
        return { data, id1 }
      })
      )
    }))
  }

  addProduct(product) {
    let id = this.getOrCreate()
    return this.firestore.collection('ShoppingCart').doc(id).collection('items').add(product)
  }

  updateCart(idSub,product) {
    let id = this.getOrCreate()
    this.firestore.doc(`ShoppingCart/${id}/items/${idSub}`).update(product)
  }

  addCart(product,j) {
    let count = 0
    this.cart1.take(1).subscribe(data => {
      data.forEach(p => {
        if (p.data.title === product.title) {
          if (j === 1) {
            this.updateCart(p['id1'],{quantity : p.data.quantity + 1})
          }
          else {
            this.updateCart(p['id1'],{quantity : p.data.quantity - 1})
          }
          count++
        }
      })
      if (count === 0) {
        product['quantity'] = 1
        this.addProduct(product)
      }
    })
  }
}
