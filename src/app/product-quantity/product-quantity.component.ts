import { Component, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input ('product') product:Product;
  @Input ('quantity') quantity;
  @Input ('i') i:number;


  constructor(
    private cartService: ShoppingCartService
    ) {
   }
 

  GetOrUpdateCart(product,i,j) {
    this.cartService.addCart(product,j)
    this.cartService.getCart().subscribe(data => {
      data.forEach(p => {
        if (p.data.title === product.title) {
          this.quantity[i] = p.data.quantity
        }
      })
    })
  }
}
