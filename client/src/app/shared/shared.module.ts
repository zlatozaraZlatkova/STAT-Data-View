import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { RssNewsComponent } from './rss-news/rss-news.component';
import { SelectMenuComponent } from './select-menu/select-menu.component';
import { PaginationComponent } from './pagination/pagination.component';

import { ExtractWordPipe } from './pipes/extract-word.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { SearchBoxComponent } from './search-box/search-box.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ExtractWordPipe,
    SearchPipe,
    RssNewsComponent,
    SelectMenuComponent,
    PaginationComponent,
    SearchBoxComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    MatIconModule 
  ],
  exports: [
    ExtractWordPipe,
    SearchPipe,
    RssNewsComponent,
    SelectMenuComponent,
    PaginationComponent,
    SearchBoxComponent,
   
  ]
})
export class SharedModule { }
