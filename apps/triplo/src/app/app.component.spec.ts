import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {TuiRootModule} from "@taiga-ui/core";
import {AuthHttpService} from "./services/authentication/auth-http.service";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, NavbarComponent],
      imports: [HttpClientModule, RouterOutlet, TuiRootModule],
      providers: [AuthHttpService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
