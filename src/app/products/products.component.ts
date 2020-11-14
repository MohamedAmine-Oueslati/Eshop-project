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
          if (res[i]['data'].title === p.data.title)
          this.quantity[i] = p.data.quantity
          this.quantityCount += p.data.quantity
          this.sum += p.data.quantity * p.data.price
          })
      })
    }
      this.products = res
    })
      
      
    // this.cartService.getCart().subscribe(data => {
    //   this.quantityCount = 0
    //   this.sum = 0
    //   data.forEach(item => {
    //     this.quantityCount += item.data.quantity
    //     if (item.data.quantity !== 0) {
    //       this.items.push(item.data)
    //     }
    //     this.sum += item.data.quantity * item.data.price
    //   })
    // })
   }
}
