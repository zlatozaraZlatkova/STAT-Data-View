import { Params } from "@angular/router";

  export function getPageFromUrl(urlParams: Params): number {
    const pageAsString = urlParams['page'];
    const pageAsNumber = parseInt(pageAsString, 10);

    if (!pageAsString || pageAsNumber < 1) {
      return 1;
    }

    return pageAsNumber;
  }
