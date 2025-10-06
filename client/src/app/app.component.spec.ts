import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { SelectMenuComponent } from './shared/select-menu/select-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class ToastrServiceStub {
  success() { }
  error() { }
  info() { }
  warning() { }
}

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent, LayoutComponent, HeaderComponent, FooterComponent, SelectMenuComponent],
    imports: [RouterTestingModule, MatIconModule, HttpClientTestingModule],
    providers: [
      { provide: ToastrService, useClass: ToastrServiceStub }
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'client'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('client');
  });

 
});
