import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: any = [];
  categories: any;
  category:any;
  filtered: any = [];
  subcollection: any = [];


  constructor(
    private productService:ProductService,
    private categoryService:CategoryService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
    ) {
    this.productService.products.subscribe(res => this.filtered = this.products = res)
    this.categoryService.getCategories().subscribe(res => this.categories = res)

    this.route.queryParamMap.subscribe(data => {
      this.category = data.get('category')
      this.filtered = (this.category) ? 
      this.products.filter((p: { data: { category: any; }; }) => p.data.category === this.category) :
      this.products
    })

    this.cartService.getCart()
   }

  addToCart(product) {
    this.cartService.addCart(product)
  }
}
