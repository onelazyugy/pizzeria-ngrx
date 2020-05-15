import { Component, OnInit } from '@angular/core';
import { CorsService } from 'src/app/service/cors.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private corsService: CorsService) { }

  ngOnInit() {
    this.corsService.fetchUserDetials().subscribe(res => {
      console.log('res: ', res);
    }, error => {
      console.log('error: ', error);
    });

    this.corsService.fetchPizzaDetails().subscribe(res => {
      console.log('res: ', res);
    }, error => {
      console.log('error: ', error);
    });
  }

}
