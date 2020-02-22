import { Component, OnInit } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarousel]
})
export class HomeComponent implements OnInit {

  showNavigationArrows = false;
  showNavigationIndicators = false;

  images = ['../assets/img/home-1.jpg', '../assets/img/home-2.jpg', '../assets/img/home-3.jpg'];

  constructor(config: NgbCarouselConfig) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = false;
  }

  ngOnInit() {
  }

}
