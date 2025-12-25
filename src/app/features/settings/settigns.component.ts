import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
@Component({
  selector: 'app-settigns',
  imports: [RouterLink, RouterOutlet,TranslatePipe ],
  templateUrl: './settigns.component.html',
  styleUrl: './settigns.component.scss'
})
export class SettignsComponent {

}
