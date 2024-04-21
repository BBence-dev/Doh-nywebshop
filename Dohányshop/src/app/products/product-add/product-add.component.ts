import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/_services/products.service';
import { Products } from 'src/app/models/products';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  products: Products[] = [];

  @Input() currentProducts: Products = {
    nev: '',
    db: '',
    ar: ''
  };

  message = '';
  currentIndex = -1;
  submitted = false;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  onCreateProduct() {
    this.productService.create(this.currentProducts).subscribe({
      next: (res: any) => {
        console.log(res);
        this.refreshList();
      },
      error: (e: any) => console.error(e)
    });
  }

  onDeleteProduct(id: any): void {
    this.productService.delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.loadProducts();
    this.currentProducts = {
      nev: '',
      db: '',
      ar: ''
    };
    this.currentIndex = -1;
  }

  updateProduct(id: any, products:Products): void {
    this.message = '';
    this.productService.update(id, products).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : 'This product was updated successfully!';
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  newProduct(): void {
    this.currentProducts = {
      nev: '',
      db: '',
      ar: ''
    };
  }
}
