import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class Orderervice {
  findByTitle(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {}

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(API_URL + 'orders');
  }
   // Egy Order lekérése az azonosító alapján
  get(id: any): Observable<Order> {
    return this.http.get<Order>(`${API_URL + 'orders'}/${id}`);
  }

  // Új Order létrehozása
  create(data: any): Observable<any> {
    return this.http.post(API_URL + 'orders', data);
  }

  // Order frissítése az azonosító alapján
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL + 'orders'}/${id}`, data);
  }

  // Order törlése az azonosító alapján
  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URL + 'orders'}/${id}`);
  }

  // Az összes Order törlése
  deleteAll(): Observable<any> {
    return this.http.delete(API_URL + 'orders');
  }

  // Cím alapján történő Order keresése
  findByNev(title: any): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_URL + 'orders'}?nev=${title}`);
  }

}
