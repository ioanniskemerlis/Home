import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit {
  ngAfterViewInit() {
    const video: HTMLVideoElement | null = document.querySelector('.background-video');
    if (video) {
      video.muted = true;
      video.play().catch(error => {
        console.log('Autoplay blocked, trying again...', error);
        video.muted = true;
        video.play();
      });
    }
  }
}
