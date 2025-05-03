import { Component, effect, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'AngularBank';
  isLoggedIn = signal(false);

  constructor(private cookieService: CookieService, private router: Router) {
    this.checkAuth();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkAuth();
      });

    effect(() => {
      this.isLoggedIn();
    });
  }

  checkAuth() {
    const token = this.cookieService.get('token');
    if (token) {
      this.isLoggedIn.set(true);
    } else {
      this.isLoggedIn.set(false);
    }
  }

  logout() {
    this.cookieService.delete('token');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
  shouldShowNavBar(): boolean {
    const hiddenRoutes = ['/login', '/register'];
    return !hiddenRoutes.includes(this.router.url);
  }
}
