import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  constructor(private firestore: AngularFirestore,private authService: AuthService,) { }

  addOrder(order) {
    return this.firestore.collection('Orders').add(order)
  }

  getOrders() {
    return this.firestore.collection('Orders').valueChanges({ idField: 'id' })
  }

  userOrder() {
    let userOrders = []
    this.authService.user$.subscribe(user => {
      this.getOrders().subscribe(orders => {
        orders.forEach((order:any) => {
          if (user?.uid === order.userId) {
            order.name = user.displayName
            userOrders.push(order)
          }
        });
      })
    })
    return userOrders
  }
}
