import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { RecentUpdatesComponent } from './recent-updates/recent-updates.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ExtractWordPipe } from './pipes/extract-word.pipe';
import { RssNewsComponent } from './rss-news/rss-news.component';
import { SelectMenuComponent } from './select-menu/select-menu.component';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [
    RecentUpdatesComponent,
    CustomButtonComponent,
    SidebarComponent,
    ExtractWordPipe,
    RssNewsComponent,
    SelectMenuComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule 
  ],
  exports: [
    RecentUpdatesComponent,
    CustomButtonComponent,
    SidebarComponent,
    ExtractWordPipe,
    RssNewsComponent,
    SelectMenuComponent,
    PaginationComponent
  ]
})
export class SharedModule { }
