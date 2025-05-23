import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  product1 = {
    productId: 1,
    productName: "Mouse",
    price: 677
  };
  product2 = {
    productId: 2,
    productName: "Keyboard",
    price: 562
  };
  product3 = {
    productId: 3,
    productName: "Phone",
    price: 67800
  };

  products = [this.product1,this.product2,this.product3]
}
