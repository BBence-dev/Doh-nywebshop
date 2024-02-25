import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent {

  displayedColumns: string[] = ['kategoriaNev', 'leiras', 'hirdetesDatuma', 'tehermentes', 'kepUrl'];
  dataSource: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/v1/admins').subscribe({
      next: (data: any[]) => this.dataSource = data,
      error: (err) => console.log(err)
    })
  }

}
