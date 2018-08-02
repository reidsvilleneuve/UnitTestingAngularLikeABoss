import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HeroComponent } from './hero.component';

describe('Hero component', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', function() {
    const hero = { id: 1, name: 'Test', strength: 100 };
    fixture.componentInstance.hero = hero;

    expect(fixture.componentInstance.hero).toEqual(hero);
  });

  it('should have the correct hero in the anchor tag', function() {
    const hero = { id: 1, name: 'Test', strength: 100 };
    fixture.componentInstance.hero = hero;

    fixture.detectChanges();

    expect(
      // TODO: Figure out how to get text without referencing the native element
      fixture.debugElement.query(By.css('a')).nativeElement.textContent
    ).toContain(hero.name);
  });
});
