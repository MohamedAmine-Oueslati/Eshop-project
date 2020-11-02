import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  categories: any;
  category:any;
  filtered: any = [];

  constructor(
    private productService:ProductService,
    private categoryService:CategoryService,
    private route: ActivatedRoute
    ) {
    this.productService.products.subscribe(res => this.filtered = this.products = res)
    this.categoryService.getCategories().subscribe(res => this.categories = res)

    this.route.queryParamMap.subscribe(data => {
      this.category = data.get('category')
      console.log(this.category)
      this.filtered = (this.category) ? 
      this.products.filter((p: { data: { category: any; }; }) => p.data.category === this.category) :
      this.products
    })
   }

  ngOnInit(): void {
  }

}
