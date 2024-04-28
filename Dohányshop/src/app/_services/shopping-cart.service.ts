import { EventEmitter, Injectable } from '@angular/core';
import { Cart } from '../models/shoppin-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartsChanged = new EventEmitter<Cart[]>();
  private carts: Cart[] = [];

  constructor() { }

  getIngredients() {
    return this.carts.slice();
  }

  addIngredient(cart: Cart) {
    const index = this.carts.findIndex(item => {
      return item.id === cart.id; // Változtasd meg ezt a feltételt az elem azonosítóját tartalmazóra
  });

  if (index === -1) {
      // Ha az elem még nem szerepel a kosárban, akkor addoljuk hozzá
      this.carts.push(cart);
      this.cartsChanged.emit(this.carts.slice());
  } else {
      // Ha az elem már szerepel a kosárban, itt lehet kezelni ezt az esetet, például figyelmeztetést adni vagy semmit sem tenni
      console.log('Az elem már szerepel a kosárban!');
  }
  }

  addIngredients(carts: Cart[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.carts.push(...this.carts);
    this.cartsChanged.emit(this.carts.slice());
  }

  removeProduct(cart: any) {
    const index = this.carts.findIndex((x: any) => x.id === cart.id);

    if (index > -1) {
      this.carts.splice(index, 1);
      this.cartsChanged.emit();
    }
  }

  clearProducts() {
    localStorage.clear();
  }
}
