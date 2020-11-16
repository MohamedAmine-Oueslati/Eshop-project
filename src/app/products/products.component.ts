import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products:any;
  quantity:any = [];
  quantityCount:number;
  sum:number;
  items:any= [];
  
  constructor(private cartService: ShoppingCartService, private productService:ProductService) {
    this.productService.products.subscribe(res => {
      for (let i = 0 ; i < res.length ; i++ ) {
      this.cartService.getCart().subscribe(data => {
        this.quantityCount = 0
        this.sum = 0
        data.forEach(p => {
          if (res[i].title === p.title)
          this.quantity[i] = p.quantity
          this.quantityCount += p.quantity
          this.sum += p.quantity * p.price
          })
      })
    }
      this.products = res
      console.log(res)
    })
   }

   Clear() {
     this.cartService.clearCart()
   }
}
