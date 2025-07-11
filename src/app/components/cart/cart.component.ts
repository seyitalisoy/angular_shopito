import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  private subscription!: Subscription;
  totalAmount: number = 0;

  constructor(private cartService: CartService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.subscription = this.cartService.cart.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    this.toastrService.error('Sepetten silindi', product.productName);
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}