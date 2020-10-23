import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  categories: any;
  
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res => this.categories = res)
  }

}
