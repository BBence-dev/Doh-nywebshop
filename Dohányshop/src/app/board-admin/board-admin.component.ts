import { Component, OnInit,Input } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
   // A user objektumok tömbje
 users?: User[];
 isListView: boolean = true;
 submitted = false;

 // Az aktuális tutoriál, amelyet kiválasztottunk

@Input() currentUser: User = {
  id: undefined,
   nev: '',
   userName: '',
   password: '',
   kor: '',
   szhely: '',
   status: ''
 };

 // Az aktuális tutoriál indexe a tömbben
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
    this.onCreateEmp();
    this.newuser();
    this.removeAllusers();
    this.refreshList();
  }

 

  loadEmployees(): void {
    this.apiService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  onCreateEmp() {
    const data = {
      id: this.currentUser.id,
      nev: this.currentUser.nev,
      userName: this.currentUser.userName,
      password: this.currentUser.password,
      szhely: this.currentUser.szhely,
      kor: this.currentUser.kor,
      status:this.currentUser.status
    };

    this.apiService.create(data).subscribe({
        next: (res: any) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e: any) => console.error(e)
      });
  }

  onEdit(item: any) { 
    debugger;
    this.currentUser = item;
    this.isListView = false;
  }
  
  onDelete(id:any): void {
    this.apiService.delete(id)
    .subscribe({
    next: (res) => {
    console.log(res);
    },
    error: (e) => console.error(e)
    });
  }
    
  newuser(): void {
    this.currentUser = {
      id:'',
      nev:'',
      userName:'',
      password:'',
      szhely:'',
      kor:'',
      status:''
    };
  }

  refreshList(): void {
    this.loadEmployees();
    this.currentUser = {
      id:'',
      nev: '',
      userName: '',
      password: '',
      kor: '',
      szhely: '',
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
}
