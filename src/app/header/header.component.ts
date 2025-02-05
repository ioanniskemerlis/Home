import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule], // ✅ Add CommonModule here
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuOpen = false; // Controls the mobile menu state

  /** Scrolls smoothly to the top */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.closeMenu();
  }

  /** Scrolls smoothly to the Contact section */
  scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      this.closeMenu();
    }
  }

  /** Toggles the mobile menu */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /** Closes the menu when clicking a link */
  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
