import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  
  displayedColumns: string[] = ['kategoriaNev', 'leiras', 'hirdetesDatuma', 'tehermentes', 'kepUrl'];
  dataSource: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/v1/products').subscribe({
      next: (data: any[]) => this.dataSource = data,
      error: (err) => console.log(err)
    })
  }

}
