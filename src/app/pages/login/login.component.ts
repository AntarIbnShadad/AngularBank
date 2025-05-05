import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormErrorComponent, RouterLink],
  templateUrl: './login.component.html',
  providers: [CookieService],
})
export class LoginComponent {
  loginForm!: FormGroup;
  returnUrl: string = '/users';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/users';
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.cookieService.set('token', res.token, { expires: 30 });
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err) => {
        console.error('Login failed, please try again.', err);
      },
    });
  }
}
