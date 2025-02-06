import { Component, HostListener, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { CategoriesComponent } from './categories/categories.component';
import { FeaturedComponent } from './featured/featured.component';
import { RelocationComponent } from './relocation/relocation.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HeroComponent,
    CategoriesComponent,
    FeaturedComponent,
    RelocationComponent,
    ContactComponent,
    FormsModule,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  private sections!: NodeListOf<HTMLElement>;
  private currentIndex = 0;
  private isScrolling = false;
  private scrollTimeout!: ReturnType<typeof setTimeout>;
  private touchStartY = 0;
  private touchEndY = 0;
  private touchMoveThreshold = 50; // Minimum swipe distance to trigger a scroll

  constructor() {}

  ngAfterViewInit() {
    this.sections = document.querySelectorAll('.sections');
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (this.isScrolling || !this.sections?.length) return;
    
    if (Math.abs(event.deltaY) < 10) return; // Ignore small touchpad movements

    this.isScrolling = true;

    if (event.deltaY > 0) {
      this.scrollToSection(this.currentIndex + 1); // Scroll Down
    } else {
      this.scrollToSection(this.currentIndex - 1); // Scroll Up
    }

    // Lock scrolling for 1 second after reaching a section
    setTimeout(() => {
      this.isScrolling = false;
    }, 1000); // Adjust delay duration here
  }

 // Handle touch scrolling for mobile
 @HostListener('touchstart', ['$event'])
 onTouchStart(event: TouchEvent) {
   this.touchStartY = event.touches[0].clientY;
 }

 @HostListener('touchmove', ['$event'])
 onTouchMove(event: TouchEvent) {
   event.preventDefault(); // Prevent default scrolling
 }

 @HostListener('touchend', ['$event'])
 onTouchEnd(event: TouchEvent) {
   this.touchEndY = event.changedTouches[0].clientY;

   if (this.isScrolling || !this.sections?.length) return;

   const swipeDistance = this.touchStartY - this.touchEndY;

   if (Math.abs(swipeDistance) > this.touchMoveThreshold) { 
     this.isScrolling = true;

     if (swipeDistance > 0) {
       this.scrollToSection(this.currentIndex + 1); // Scroll Down
     } else {
       this.scrollToSection(this.currentIndex - 1); // Scroll Up
     }

     setTimeout(() => {
       this.isScrolling = false;
     }, 1000);
   }
 }

  @HostListener('window:scroll', [])
  onManualScroll() {
    if (!this.sections) return;

    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => { 
      this.scrollToSection(this.getClosestSectionIndex());
      this.isScrolling = false;
    }, 300);
  }

  private getClosestSectionIndex(): number {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    this.sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const distance = Math.abs(scrollPosition - sectionTop);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }

  private scrollToSection(index: number) {
    if (!this.sections || index < 0 || index >= this.sections.length) return;
    
    this.currentIndex = index;
    this.sections[this.currentIndex].scrollIntoView({ behavior: 'smooth' });
  }
}
