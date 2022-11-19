import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUserstoriesComponent } from './about-userstories.component';

describe('AboutUserstoriesComponent', () => {
  let component: AboutUserstoriesComponent;
  let fixture: ComponentFixture<AboutUserstoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutUserstoriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUserstoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
