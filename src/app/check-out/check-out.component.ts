import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  products:any={};
  totalPrice:number;
  totalQuantity:number;
  shipping:any={}
  userId:any;
  subscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private router:Router,
    private authService: AuthService,
    private orderService: OrderService,
    private cartService:ShoppingCartService
    ) { }

    ngOnInit(): void {
      this.subscription = this.cartService.getCart().subscribe(items => {
        this.totalPrice = 0
        this.totalQuantity = 0
          items.forEach(i => { 
            this.totalPrice += i.quantity * Number(i.price)
            this.totalQuantity += i.quantity
          });
          this.products = items
          })
      this.userSubscription = this.authService.user$.subscribe(user => this.userId = user?.uid)
    }

  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.userSubscription.unsubscribe()
  }

  async placeOrder(shipping) {
    let d = new Date()
    let date = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear()
    let orders = {
      datePlaced: date,
      shipping: shipping,
      product: this.products,
      userId: this.userId
    }
    let result = await this.orderService.addOrder(orders)
    this.cartService.clearCart()

    this.router.navigate(['/Order-Success', result.id])
  }
}
