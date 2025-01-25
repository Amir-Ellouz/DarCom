import {Component, OnInit} from '@angular/core';
import { RouteWatcherService } from './route-watcher.service';
import {Store} from "@ngrx/store";
import {autoLogin} from "./auth/store/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit{
  showHeaderFooter: boolean = true;
  title = "DarCom"
  constructor(private routeWatcherService: RouteWatcherService
              ,private store: Store
  ) {
    routeWatcherService.showHeaderFooter.subscribe((show) => {
      this.showHeaderFooter = show;
    });
  }

  ngOnInit(): void {
        this.store.dispatch(autoLogin())
    }
}
