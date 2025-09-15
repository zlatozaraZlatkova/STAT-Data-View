import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsAndUpdatesComponent } from './news-and-updates/news-and-updates.component';
import { RecentUpdatesComponent } from './recent-updates/recent-updates.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ExtractWordPipe } from './pipes/extract-word.pipe';



@NgModule({
  declarations: [
    NewsAndUpdatesComponent,
    RecentUpdatesComponent,
    CustomButtonComponent,
    SidebarComponent,
    ExtractWordPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NewsAndUpdatesComponent,
    RecentUpdatesComponent,
    CustomButtonComponent,
    SidebarComponent,
    ExtractWordPipe
  ]
})
export class SharedModule { }
