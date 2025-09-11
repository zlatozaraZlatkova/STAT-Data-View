import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/source-data/source-data.module').then((m) => m.SourceDataModule),
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    data: {
      title: '404 Page',
      layout: 'auth',
      showHeader: true,
      showFooter: false,
    }
  },
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
