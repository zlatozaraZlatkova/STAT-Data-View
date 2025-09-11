import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { IRouteData } from '../interfaces/routeData';




@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})

export class LayoutComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pageTitle: Title
  ) { };

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getCurrentRouteData())
      )
      .subscribe((data) => {
        this.addRouteSettings(data);
      });
  }

  private getCurrentRouteData(): IRouteData {
    let route = this.activatedRoute;

    while (route.firstChild) {
      route = route.firstChild;
    }

    return route.snapshot.data || {};
  }

  private addRouteSettings(data: IRouteData): void {
    if (data['title']) {
      this.pageTitle.setTitle(data['title']);
    }

  }
}
