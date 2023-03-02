import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {AuthHttpService} from "../../services/authentication/auth-http.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TuiSidebarModule} from "@taiga-ui/addon-mobile";
import {RouterTestingModule} from "@angular/router/testing";
import {AsyncPipe, NgIf} from "@angular/common";
import {TuiActiveZoneModule} from "@taiga-ui/cdk";
import {TuiIslandModule} from "@taiga-ui/kit";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientTestingModule, TuiSidebarModule, TuiActiveZoneModule,
        RouterTestingModule, NgIf, AsyncPipe, TuiSidebarModule, TuiIslandModule],
      providers: [AuthHttpService]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
