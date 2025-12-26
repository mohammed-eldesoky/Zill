import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth-service/auth.service';
import { JwtPayload } from 'jwt-decode';
import { TranslatePipe } from '@ngx-translate/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, TranslatePipe],

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  nickName = signal<null | JwtPayload>(null);
  dir: any;
  profileUrl: string | null = null;

  constructor(private auth: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    console.log(this.auth.getUserData());
    const { nickName } = this.auth.getUserData();
    this.nickName.set(nickName);
    const savedUrl = localStorage.getItem('profileUrl');
    if (savedUrl) {
      this.profileUrl = savedUrl;
      this.userService.updateProfileUrl(savedUrl);
    }

    this.userService.profileUrl$.subscribe((url) => {
      if (url) {
        this.profileUrl = url;
      }
    });
  }
  //__________________________________profile picture___________________________

  //__________________________________Logout___________________________

  logout() {
    this.auth.logout();
  }
}
