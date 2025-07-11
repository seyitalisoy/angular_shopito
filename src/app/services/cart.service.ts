import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartItems } from '../models/cartItems';
import { CartItem } from '../models/cartItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageKey = 'cartItems';

  private cartSubject = new BehaviorSubject<CartItem[]>(this.getCart());

  cart = this.cartSubject.asObservable();

  constructor() { }


  private saveCart(cart: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  // addToCart(product:Product){
  //   let item = CartItems.find(c=>c.product.productId===product.productId);

  //   if (item) {
  //     item.quantity+=1;
  //   }else{
  //     let cartItem = new CartItem();
  //     cartItem.product = product;
  //     cartItem.quantity = 1;
  //     CartItems.push(cartItem);
  //   }
  // }
  addToCart(product: Product): void {
    const cart: CartItem[] = this.getCart();
    const item = cart.find(c=> c.product.productId === product.productId);
    if(item){
      item.quantity +=1;
    }else{
      cart.push({product,quantity:1});
    }
    this.saveCart(cart);
  }

  // list(): CartItem[]{
  //   return CartItems;
  // }
  getCart() : CartItem[]{
    const cartJson = localStorage.getItem(this.storageKey);
    return cartJson ? JSON.parse(cartJson) : [];
  }

  // removeFromCart(product: Product){
  //   let item = CartItems.find(c=>c.product.productId===product.productId);
  //   CartItems.splice(CartItems.indexOf(item),1);
  // }
  removeFromCart(product: Product): void{
    let cart: CartItem[] = this.getCart();
    cart = cart.filter(item=> item.product.productId !== product.productId);
    this.saveCart(cart);
  }

  clearCart() : void{
    this.saveCart([]);
  }
}
