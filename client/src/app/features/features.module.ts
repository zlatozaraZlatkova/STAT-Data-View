import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SourceDataModule } from './source-data/source-data.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    SourceDataModule,
    RouterModule,
  ]
})
export class FeaturesModule { }
