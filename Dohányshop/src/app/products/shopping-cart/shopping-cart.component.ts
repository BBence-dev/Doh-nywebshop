import { Component, EventEmitter, Input, OnInit} from '@angular/core';
import { Orderervice } from 'src/app/_services/order.service';
import { ShoppingCartService } from 'src/app/_services/shopping-cart.service';
import { StorageService } from 'src/app/_services/storage.service';
import { Order } from 'src/app/models/order';
import { Cart } from 'src/app/models/shoppin-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{
   carts: Cart[]=[];
   subTotal!: any;
   isLoggedIn = false;

   currentUser: any;

   cartsChanged = new EventEmitter<Cart[]>();

   @Input() currentProducts: Order = {
    id:'',
    nev: '',
    payment:'',
    db: 0,
    ar: 0
  };
   onCreateOrder() {
    this.currentProducts.nev=this.currentUser.username
    this.currentProducts.db=this.totalQuantity;
    this.currentProducts.ar = this.total;
    this.orderService.create(this.currentProducts).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (e: any) => console.error(e)
    });
  }

  constructor(private slService: ShoppingCartService,
    private storageService: StorageService,
    private orderService: Orderervice
  ) { }

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.carts = this.slService.getIngredients();
    this.slService.cartsChanged
      .subscribe(
        (carts: Cart[]) => {
          this.carts = carts;
        }
      );
  }

 

  removeProduct(cart: any) {
    this.slService.removeProduct(cart);
    this.carts = this.slService.getIngredients();
  }

  clearProducts() {
    localStorage.clear();
  }

  get total() {
    return this.carts?.reduce(
      (sum, product) => ({
        quantity: 1,
        price: sum.price + product.ar * product.db,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }

  get totalQuantity() {
    return this.carts?.reduce(
      (total, product) => total + product.db,
      0
    );
  }

}
