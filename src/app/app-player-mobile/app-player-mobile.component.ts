import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-player-mobile',
  templateUrl: './app-player-mobile.component.html',
  styleUrls: ['./app-player-mobile.component.scss']
})
export class AppPlayerMobileComponent implements OnInit {
  @Input() name: any;
  @Input() playerActive: boolean = false;
  @Input() image = 'ava1.png';


  constructor() { }

  ngOnInit(): void {
  }

}
