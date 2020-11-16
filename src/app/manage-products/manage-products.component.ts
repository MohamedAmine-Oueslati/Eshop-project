import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit, OnDestroy {
  products:any;
  filtered: any;
  subscription:Subscription;

  constructor(private productService:ProductService,) {
    this.subscription = this.productService.products.subscribe(res => this.filtered = this.products = res)
   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
  }

  filter(query: string) {
    this.filtered = (query) ? 
      this.products.filter((p: { title: string }) => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products
  }

}
