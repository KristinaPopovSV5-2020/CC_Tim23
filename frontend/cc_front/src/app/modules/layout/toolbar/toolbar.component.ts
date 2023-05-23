import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input()
  color!: string;
  role: any;
  logged:boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userState$.subscribe((result) => {
      this.isLogged();
    });
  }

  isLogged():void{
    this.logged= this.authService.isLoggedIn();
  }

  

}
