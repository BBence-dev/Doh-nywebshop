import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {

  // user objektum inicializálása üres értékekkel
  user: User = {
    nev:'',
    userName:'',
    password:'',
    szhely:'',
    kor:''
  };

  // submitted változó inicializálása hamis értékkel
  submitted = false;

  constructor(private apiService: ApiService) {}

  saveUser(): void {
    const data = {
      nev: this.user.nev,
      userName: this.user.userName,
      password: this.user.password,
      szhely: this.user.szhely,
      kor: this.user.kor
    };

    this.apiService.create(data).subscribe({
        next: (res: any) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e: any) => console.error(e)
      });
  }

  // Az űrlapban megadott adatok törlése és a submitted változó visszaállítása
  newuser(): void {
    this.submitted = false;
    this.user = {
      nev:'',
      userName:'',
      password:'',
      szhely:'',
      kor:''
    };
  }

}
