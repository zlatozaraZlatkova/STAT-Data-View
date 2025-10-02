import { Component} from '@angular/core';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-select-menu',
  templateUrl: './select-menu.component.html',
  styleUrls: ['./select-menu.component.css'],
})
export class SelectMenuComponent {
  selectedCountry$ = this.apiService.selectedCountry$;

  constructor(private apiService: ApiService) {}

  onCountryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;

    if (selectedValue) {
      this.apiService.setSelectedCountry(selectedValue);
    }
  }
}
