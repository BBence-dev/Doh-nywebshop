import { Component, Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProductsService } from 'src/app/_services/products.service';
import { Products } from 'src/app/models/products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  @Input() viewMode = false;

@Input() currentUser: Products = {
    id: undefined,
     nev: '',
     db:0,
     ar:0
   };

currentIndex = -1;
 id='';
 nev='';
 db= 0;
 ar= 0

 constructor(private apiService: ProductsService,
  private route: ActivatedRoute,
 ) {
 }

 

 ngOnInit(): void {
  if (!this.viewMode) {
    this.loadProducts(this.route.snapshot.params['id']);
  }
}

 loadProducts(id: string): void {
  this.apiService.get(id)
    .subscribe({
      next: (data) => {
        this.currentUser = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}

}
