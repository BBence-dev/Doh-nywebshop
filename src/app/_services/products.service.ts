import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/products';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Products[]> {
    return this.http.get<Products[]>(API_URL + 'products');
  }
   // Egy products lekérése az azonosító alapján
  get(id: any): Observable<Products> {
    return this.http.get<Products>(`${API_URL + 'products'}/${id}`);
  }

  // Új products létrehozása
  create(data: any): Observable<any> {
    return this.http.post(API_URL + 'products', data);
  }

  // products frissítése az azonosító alapján
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL + 'products'}/${id}`, data);
  }

  // products törlése az azonosító alapján
  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URL + 'products'}/${id}`);
  }

  // Az összes products törlése
  deleteAll(): Observable<any> {
    return this.http.delete(API_URL + 'products');
  }

  // Cím alapján történő products keresése
  findByNev(nev: any): Observable<Products[]> {
    return this.http.get<Products[]>(`${API_URL + 'products'}?nev=${nev}`);
  }

}
