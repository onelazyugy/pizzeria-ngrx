import { Component } from '@angular/core';
import { HelperService } from './service/pizzeria-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;

  constructor(private helperService: HelperService) {}

  logout() {
    this.helperService.removeFromLocalStorage();
  }
}
