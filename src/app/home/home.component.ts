import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import 'rxjs/add/operator/take'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any = [];
  categories: any;
  category:any;
  filtered: any = [];
  subcollection: any = [];
  quantity:any = [];


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
   }
  ngOnInit() {
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
