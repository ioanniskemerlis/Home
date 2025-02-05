import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-relocation',
  standalone: true,
  templateUrl: './relocation.component.html',
  styleUrls: ['./relocation.component.scss']
})
export class RelocationComponent implements AfterViewInit {
  ngAfterViewInit() {
    const video: HTMLVideoElement | null = document.getElementById('relocation-video') as HTMLVideoElement;
    
    if (video) {
      video.muted = true;  // Force mute (required for autoplay)
      video.play().then(() => {
        console.log('Video is autoplaying!');
      }).catch(error => {
        console.log('Autoplay blocked, retrying...', error);
        video.muted = true;
        video.play();
      });
    }
  }
}
