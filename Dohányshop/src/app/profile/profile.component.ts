import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  message = '';

  constructor(private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }
  

  updateTutorial(): void {
    this.message = '';

    this.userService
      .update1(this.currentUser.id, this.currentUser)
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

  
  deleteTutorial(): void {
    this.userService.delete(this.currentUser.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['home']);
      },
      error: (e) => console.error(e)
    });
  }
}
