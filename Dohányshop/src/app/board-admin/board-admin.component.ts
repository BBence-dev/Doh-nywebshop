import { Component, OnInit,Input } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Role, User } from '../models/user';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
   // A user objektumok tömbje
 users?: User[] =[];
 roles?: Role[];
 isListView: boolean = true;
 submitted = false;

 // Az aktuális tutoriál, amelyet kiválasztottunk

@Input() currentUser: User = {
   nev: '',
   username: '',
   password: '',
   kor: 0,
   szhely: '',
   status: ''
 };

 // Az aktuális tutoriál indexe a tömbben
 currentIndex = -1;
 nev='';
 username= '';
 password= '';
 kor= 0;
 szhely= '';
 status='';
 
 role=[]

  message='' ;

  constructor(private apiService: UserService,
  ) {

  }

  ngOnInit(): void {
    this.loadEmployees();
    this.newuser();
  }

  loadEmployees(): void {
    this.apiService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data.map((user: any) => new User(user));;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

 

  onEdit(item: any) { 
    this.currentUser = item;
    this.isListView = false;
  }
  
  onDelete(id:any): void {
    this.apiService.delete(id)
    .subscribe({
    next: (res) => {
    console.log(res);
    this.refreshList();
    },
    error: (e) => console.error(e)
    });
  }

  
    
  newuser(): void {
    this.currentUser = {
      id:'',
      nev:'',
      username:'',
      password:'',
      szhely:'',
      kor:0,
      status:''
    };
  }

  refreshList(): void {
    this.loadEmployees();
    this.currentUser = {
      id:'',
      nev:'',
      username:'',
      password:'',
      szhely:'',
      kor:0,
      status:''
    };
    this.currentIndex = -1;
  }

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
  updateCurrentUser(id:any,users:User): void {
    this.message = '';

    this.apiService
      .update(id, users)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This tutorial was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  
}
