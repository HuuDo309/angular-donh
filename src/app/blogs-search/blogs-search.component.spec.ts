import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsSearchComponent } from './blogs-search.component';

describe('BlogsSearchComponent', () => {
  let component: BlogsSearchComponent;
  let fixture: ComponentFixture<BlogsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
