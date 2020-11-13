import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  quantityCount:number;
  sum:number;
  items:any= [];
  
  constructor(private cartService: ShoppingCartService) {
    this.cartService.getCart().subscribe(data => {
      this.quantityCount = 0
      this.sum = 0
      data.forEach(item => {
        this.quantityCount += item.data.quantity
        if (item.data.quantity !== 0) {
          this.items.push(item.data)
        }
        this.sum += item.data.quantity * item.data.price
      })
    })
   }

  ngOnInit(): void {
  }
}
