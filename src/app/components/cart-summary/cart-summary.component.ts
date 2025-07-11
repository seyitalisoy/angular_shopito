import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-summary',
  imports: [CommonModule],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent implements OnInit,OnDestroy{
  cartItems : CartItem[]=[];
  private subscription : Subscription;


  constructor(private cartService:CartService,private toastrService: ToastrService) {    
  }
  
  ngOnInit(): void {
    this.subscription = this.cartService.cart.subscribe(items => {
      this.cartItems = items;
    });
    // this.getCart();
  }

  getCart(){
    this.cartItems = this.cartService.getCart();
  }

  removeFromCart(product:Product){
    this.cartService.removeFromCart(product);
    this.toastrService.error("Sepetten silindi",product.productName)
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}


