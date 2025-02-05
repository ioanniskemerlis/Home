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
  imports: [RouterOutlet,
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
  private scrollTimeout!: ReturnType<typeof setTimeout>; // ✅ Now properly stores a timeout ID

  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.sections = document.querySelectorAll('.sections'); // ✅ Get all sections after rendering
    }, 500);
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (this.isScrolling || !this.sections) return;

    this.isScrolling = true;
    setTimeout(() => (this.isScrolling = false), 800); // ✅ Delay between scrolls

    if (event.deltaY > 0) {
      this.scrollToSection(this.currentIndex + 1); // Scroll Down
    } else {
      this.scrollToSection(this.currentIndex - 1); // Scroll Up
    }
  }

  @HostListener('window:scroll', [])
  onManualScroll() {
    if (!this.sections) return;

    clearTimeout(this.scrollTimeout); // ✅ Now correctly clears the timeout

    this.scrollTimeout = setTimeout(() => { // ✅ Stores timeout ID
      this.scrollToSection(this.getClosestSectionIndex());
      this.isScrolling = false;
    }, 300); // ✅ Snap to closest section after manual scrolling
  }

  private getClosestSectionIndex(): number {
    const scrollPosition = window.scrollY + window.innerHeight / 2; // ✅ Middle of viewport
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