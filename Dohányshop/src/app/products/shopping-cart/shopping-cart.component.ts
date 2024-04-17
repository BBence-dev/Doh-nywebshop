import { Component, EventEmitter, OnInit} from '@angular/core';
import { ShoppingCartService } from 'src/app/_services/shopping-cart.service';
import { Cart } from 'src/app/models/shoppin-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{
   carts: Cart[]=[];

   cartsChanged = new EventEmitter<Cart[]>();

  constructor(private slService: ShoppingCartService) { }

  ngOnInit() {
    this.carts = this.slService.getIngredients();
    this.slService.cartsChanged
      .subscribe(
        (carts: Cart[]) => {
          this.carts = carts;
        }
      );
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
