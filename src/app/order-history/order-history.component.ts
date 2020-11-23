import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {
  index:number;
  sum:number;
  userOrders:any;
  userOrder:any

  constructor(
    private orderService:OrderService,
    private authService:AuthService,
    private route:ActivatedRoute
  ) {
    let index = Number(this.route.snapshot.paramMap.get('id'))
    this.userOrders = []
    this.authService.user$.subscribe(user => {
      this.orderService.getOrders().subscribe(orders => {
        orders.forEach((order:any) => {
          if (user.uid === order.userId) {
            this.userOrders.push(order)
          }
        });
        let products = this.userOrders[index].product
        this.userOrder = products
        this.sum = 0
        products.forEach(p => {
          this.sum += p.quantity * p.price
        });
      })
    })
   }
}
