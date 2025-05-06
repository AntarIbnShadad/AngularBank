import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormErrorComponent, RouterLink],
  templateUrl: './register.component.html',
  providers: [CookieService],
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private cookieService: CookieService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      image: [null, Validators.required],
    });
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files?.length) {
      this.registerForm.patchValue({ image: fileInput.files[0] });
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.loading = true;

    const formData = new FormData();
    formData.append('username', this.registerForm.get('username')?.value);
    formData.append('password', this.registerForm.get('password')?.value);
    formData.append('image', this.registerForm.get('image')?.value);

    this.authService.register(formData).subscribe({
      next: (res) => {
        this.cookieService.set('token', res.token, { expires: 30 });
        this.router.navigate(['/users']);
        this.loading = false;
      },
      error: (err: any) => {
        this.toastService.error('Registration failed. Please try again.');
        this.loading = false;
      },
    });
  }
}
