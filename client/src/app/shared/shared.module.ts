import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsAndUpdatesComponent } from './news-and-updates/news-and-updates.component';
import { RecentUpdatesComponent } from './recent-updates/recent-updates.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    NewsAndUpdatesComponent,
    RecentUpdatesComponent,
    CustomButtonComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NewsAndUpdatesComponent,
    RecentUpdatesComponent,
    CustomButtonComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
