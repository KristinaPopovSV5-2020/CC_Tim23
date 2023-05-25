import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-toolbar',
  templateUrl: './user-toolbar.component.html',
  styleUrls: ['./user-toolbar.component.css']
})
export class UserToolbarComponent implements OnInit {


  @Input()
  color!: string;


  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.userState$.subscribe((result) => {
      console.log(result);
    });
  }



  logout() {
    localStorage.removeItem('user');
    this.authService.setUser();
    this.router.navigate(['login']);
  }

}
