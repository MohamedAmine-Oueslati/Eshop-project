import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  quantityCount:number = 0;

  constructor(public auth :AuthService, private cartService: ShoppingCartService, private route:Router) {
   }

  ngOnInit() {
    this.cartService.getCart().subscribe(cart => {
      this.quantityCount = 0
      cart.forEach(item => {
        this.quantityCount += item.quantity
      })
    })
  }

  logout() {
    this.auth.logout()
    this.route.navigate(['Home'])
  }
}
