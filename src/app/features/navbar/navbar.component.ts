import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth-service/auth.service';
import { JwtPayload } from 'jwt-decode';
import {TranslatePipe} from "@ngx-translate/core";
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, TranslatePipe],

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  nickName = signal<null | JwtPayload>(null);
dir: any;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    console.log(this.auth.getUserData());
    const { nickName } = this.auth.getUserData();
    this.nickName.set(nickName);
  }
}
