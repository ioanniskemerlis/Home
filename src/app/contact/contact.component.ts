import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule], 
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  name = '';
  phone = '';
  email = '';
  message = '';
  isSubmitted = false; 

  submitForm() {
    const googleFormsUrl =
      'https://corsproxy.io/?' + encodeURIComponent(
        'https://docs.google.com/forms/d/e/1FAIpQLSdSRoEB78m8G7ooNSws0jEPaUie4iXESIR9xGFh6q-YS66yJg/formResponse'
      );
  
    
    const formData = new FormData();
    formData.append('entry.243525273', this.name);
    formData.append('entry.952118200', this.phone);
    formData.append('entry.787584534', this.email);
    formData.append('entry.1561589584', this.message);
  
    
    fetch(googleFormsUrl, {
      method: 'POST',
      body: formData,
    })
      .then(() => {
        this.isSubmitted = true; 
        setTimeout(() => (this.isSubmitted = false), 5000); 
      })
      .catch(error => console.error('Error:', error));
  
    
    this.name = '';
    this.phone = '';
    this.email = '';
    this.message = '';
  }
}  