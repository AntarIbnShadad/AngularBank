import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Register } from '../../data/interfaces';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: ApiService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onSubmit() {
    //if (this.registerForm.valid && this.selectedImage) {
    const registerData: Register = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      image: this.registerForm.value.image,
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        alert('Account created successfully!');
        this.router.navigate(['/login']);
        console.log('success');
      },
      error: (err) => {
        alert('Registration failed');
        console.error(err);
      },
    });
    //}
  }
}
