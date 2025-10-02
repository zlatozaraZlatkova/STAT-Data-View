
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { IRssNews } from 'src/app/interfaces/rssNews';
import { createPaginatedResponse } from 'src/app/shared/utils/create-paginates-response';
import { parseXmlToJson } from 'src/app/shared/utils/xml-parser'

@Injectable({
  providedIn: 'root'
})

export class RssNewsService implements OnDestroy {
  private rssNews$$ = new BehaviorSubject<IRssNews | null>(null);
  rssNews$ = this.rssNews$$.asObservable();

  constructor(private apiService: ApiService) { }

  getRssNews(page: number = 1, limit: number = 10): Observable<IRssNews> {
    return this.apiService.getRssNews().pipe(
      map((response: string) => {
        const parsedData = parseXmlToJson(response);

        return createPaginatedResponse(parsedData, page, limit);
        
      }),
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
