import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth-service/auth.service';
import { JwtPayload } from 'jwt-decode';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink],

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  nickName = signal<null | JwtPayload>(null);

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    console.log(this.auth.getUserData());
    const { nickName } = this.auth.getUserData();
    this.nickName.set(nickName);
  }
}
