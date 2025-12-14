import { Component } from '@angular/core';
import { NavbarComponent } from "../../../features/navbar/navbar.component";
import { FooterComponent } from "../../../features/footer/footer.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
