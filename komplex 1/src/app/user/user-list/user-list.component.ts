import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  // A user objektumok tömbje
  users?: User[];

  // Az aktuális tutoriál, amelyet kiválasztottunk
  currentUser: User = {
    nev: '',
    userName: '',
    password: '',
    kor: '',
    szhely: ''
  };

  // Az aktuális tutoriál indexe a tömbben
  currentIndex = -1;

  nev='';
  userName= '';
  password= '';
  kor= '';
  szhely= ''


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Az ngOnInit() metódus futása a komponens inicializálásakor
    // Az összes tutoriál lekérése
    this.retrieveusers();
  }

  // Az összes tutoriál lekérése
  retrieveusers(): void {
    this.apiService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  // Lista frissítése
  refreshList(): void {
    this.retrieveusers();
    this.currentUser = {
      nev: '',
      userName: '',
      password: '',
      kor: '',
      szhely: ''
    };
    this.currentIndex = -1;
  }

  // Kiválasztott tutoriál beállítása
  setActiveuser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  // Az összes tutoriál törlése
  removeAllusers(): void {
    this.apiService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  // Cím alapján történő keresés
  searchNev(): void {
    this.currentUser = {
      nev: '',
      userName: '',
      password: '',
      kor: '',
      szhely: ''
    };
    this.currentIndex = -1;

    this.apiService.findByNev(this.nev)
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
