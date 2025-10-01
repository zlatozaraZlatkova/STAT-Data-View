
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { IRssNews } from 'src/app/interfaces/rssNews';
import { parseXmlToJson } from 'src/app/shared/util/xml-parser'

@Injectable({
  providedIn: 'root'
})

export class RssNewsService implements OnDestroy {
  private rssNews$$ = new BehaviorSubject<IRssNews | null>(null);
  rssNews$ = this.rssNews$$.asObservable();

  constructor(private apiService: ApiService) { }

  getRssNews(): Observable<IRssNews> {
    return this.apiService.getRssNews().pipe(
      map((response: string) => {
        return parseXmlToJson(response)
      }),
      map((rss: IRssNews) => ({
        ...rss,
        items: rss.items.slice(0, 15)
      })),
      tap((response: IRssNews) => {
        this.rssNews$$.next(response);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }



  ngOnDestroy(): void {
    this.rssNews$$.complete();
  }


}
