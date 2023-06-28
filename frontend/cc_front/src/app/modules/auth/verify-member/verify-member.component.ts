import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-verify-member',
  templateUrl: './verify-member.component.html',
  styleUrls: ['./verify-member.component.css']
})
export class VerifyMemberComponent implements OnInit{

  username: string = "";
  invitedUsername: string = "";

  constructor(private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username')!;
    this.invitedUsername = this.route.snapshot.paramMap.get('invitedUsername')!;
  }

  verify(): void{
    this.authService.verifyMember({
      username:this.username,
      invitedUsername: this.invitedUsername
    }).subscribe({
      next: (result) => {
        alert("Success!")
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
            alert("");
        }
      },
    });

  }
}