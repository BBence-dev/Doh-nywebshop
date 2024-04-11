import { Component, Input } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  users?: User[];

  @Input() currentUser: User = {
    id: undefined,
     nev: '',
     userName: '',
     password: '',
     kor: '',
     szhely: '',
     status: ''
   };

currentIndex = -1;
 id='';
 nev='';
 userName= '';
 password= '';
 kor= '';
 szhely= '';
 status=''

 constructor(private apiService: UserService) {
 }

 ngOnInit(): void {
  this.loadEmployees();
}



loadEmployees(): void {
  this.apiService.All()
    .subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}
}
