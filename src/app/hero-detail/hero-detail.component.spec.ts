import { By } from '@angular/platform-browser';
import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';
import { FormsModule } from '@angular/forms';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';

describe('HeroDetailComponent', () => {
  let mockHeroService;
  let TEST_HEROES;
  let fixture;

  beforeEach(() => {
    TEST_HEROES = [
      { id: 1, name: 'Test 1', strength: 2 },
      { id: 2, name: 'Test 2', strength: 200 }
    ];

    mockHeroService = jasmine.createSpyObj([
      'updateHero',
      'getHero'
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService
        }
      ],
      imports: [RouterTestingModule, FormsModule]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.updateHero.and.returnValue(of(TEST_HEROES[0]));
    mockHeroService.getHero.and.returnValue(of(TEST_HEROES[0]));
    fixture.detectChanges();
  });

  it('should asdfasdf', fakeAsync(() => {
    spyOn(fixture.componentInstance.location, 'back');
    fixture.componentInstance.save();
    flush();

    expect(mockHeroService.updateHero).toHaveBeenCalled();
    expect(fixture.componentInstance.location.back).toHaveBeenCalled();
  }));
});
