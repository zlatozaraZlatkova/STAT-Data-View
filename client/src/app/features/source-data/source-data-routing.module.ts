import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RssNewsListComponent } from './rss-news-list/rss-news-list.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: DashboardComponent,
                data: {
                    title: 'Source Data Dashboard',
                    layout: 'default',
                    showHeader: true,
                    showFooter: true,
                }
            },
            {
                path: 'rss-news',
                component: RssNewsListComponent,
                data: {
                    title: 'RSS News',
                    layout: 'default',
                    showHeader: true,
                    showFooter: true,
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class SourceDataRoutingModule { }