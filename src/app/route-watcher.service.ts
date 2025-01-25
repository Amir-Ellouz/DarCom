import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteWatcherService {
  private showHeaderFooterSource = new BehaviorSubject<boolean>(true);
  public showHeaderFooter = this.showHeaderFooterSource.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const pathsToHide = [
          '/auth/sign-in',
          '/auth/sign-up',
        ]; 
        this.showHeaderFooterSource.next(
          !pathsToHide.includes(event.urlAfterRedirects)
        );
      }
    });
  }
}
