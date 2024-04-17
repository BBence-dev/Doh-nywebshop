import { Component} from '@angular/core';
import { Products } from '../models/products';
import { ProductsService } from '../_services/products.service';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { Cart } from '../models/shoppin-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  private carts: Cart[] = [];

  products?: Products[];

currentUser: Products = {
    id: undefined,
     nev: '',
     db:'',
     ar:''
   };

currentIndex = -1;
 id='';
 nev='';
 db= '';
 ar= ''

 constructor(private apiService: ProductsService,
  private slService:ShoppingCartService
 ) {
 }

 ngOnInit(): void {
  this.loadProducts();
}



loadProducts(): void {
  this.apiService.getAll()
    .subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}

onAddItem(carts:any) {
  this.slService.addIngredient(carts);
}

}
