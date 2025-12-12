import { Component } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor(private userService:UserService, private router:Router){}

  ngOnInit() {
    if (!this.userService.isLogged()) {
        this.router.navigate(["/login"]);
    }  
  }

}
