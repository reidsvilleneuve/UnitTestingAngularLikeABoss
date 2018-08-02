import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';

import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { HeroComponent } from '../hero/hero.component';

describe('Heroes component', () => {
  let mockHeroService;
  let TEST_HEROES;

  beforeEach(() => {
    TEST_HEROES = [
      { id: 1, name: 'Test 1', strength: 2 },
      { id: 2, name: 'Test 2', strength: 200 }
    ];

    mockHeroService = jasmine.createSpyObj([
      'addHero',
      'deleteHero',
      'getHeroes'
    ]);

    mockHeroService.getHeroes.and.returnValue(of(TEST_HEROES));
  });

  describe('unit', () => {
    let component;

    beforeEach(() => {
      component = new HeroesComponent(mockHeroService);
      component.heroes = [];
    });

    describe('ngOnInit', () => {
      it('should get heroes from the heroes service', () => {
        component.ngOnInit();

        expect(mockHeroService.getHeroes).toHaveBeenCalled();
      });

      it('should add the heroes to the heroes array', () => {
        component.getHeroes();

        expect(component.heroes).toEqual(TEST_HEROES);
      });
    });

    describe('getHeroes', () => {
      it('should get heroes from the heroes service', () => {
        component.getHeroes();

        expect(mockHeroService.getHeroes).toHaveBeenCalled();
      });

      it('should add the heroes to the heroes array', () => {
        component.getHeroes();

        expect(component.heroes).toEqual(TEST_HEROES);
      });
    });

    describe('add', () => {
      const DEFAULT_STRENGTH = 11;

      beforeEach(() => {
        mockHeroService.addHero.and.returnValue(of(TEST_HEROES[0]));
      });

      it('should call the heros service add endpoint', () => {
        component.add('test');

        expect(mockHeroService.addHero).toHaveBeenCalledWith({
          name: 'test',
          strength: DEFAULT_STRENGTH
        });
      });

      it('should trim the name', () => {
        component.add(' test  ');

        expect(mockHeroService.addHero).toHaveBeenCalledWith({
          name: 'test',
          strength: DEFAULT_STRENGTH
        });
      });

      it('should do nothing if the trimmed name is blank', () => {
        component.add('  ');

        expect(mockHeroService.addHero).not.toHaveBeenCalled();
      });

      it('should add the hero after the service replies', () => {
        component.add('test');

        expect(component.heroes).toEqual([TEST_HEROES[0]]);
      });
    });

    describe('delete', () => {
      beforeEach(() => {
        mockHeroService.deleteHero.and.returnValue(of(null));
      });

      it('should remove the hero from the list', () => {
        component.heroes = [...TEST_HEROES];

        component.delete(TEST_HEROES[1]);

        expect(component.heroes).toEqual([TEST_HEROES[0]]);
      });

      it('should call the delete endpoint of the heroes service', () => {
        component.heroes = [...TEST_HEROES];

        component.delete(TEST_HEROES[1]);

        expect(mockHeroService.deleteHero).toHaveBeenCalledWith(TEST_HEROES[1]);
      });
    });
  });

  describe('integration', () => {
    let fixture;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HeroComponent, HeroesComponent],
        providers: [
          {
            provide: HeroService,
            useValue: mockHeroService
          }
        ],
        imports: [RouterTestingModule]
      });

      fixture = TestBed.createComponent(HeroesComponent);

      mockHeroService.getHeroes.and.returnValue(of(TEST_HEROES));
      fixture.detectChanges();
    });

    it('should set heroes correctly from service', () => {
      expect(fixture.componentInstance.heroes).toEqual(TEST_HEROES);
    });

    it('should create a correct number of hero element', () => {
      expect(
        fixture.debugElement.queryAll(By.directive(HeroComponent)).length
      ).toEqual(TEST_HEROES.length);
    });

    it('should pass the correct data into each hero component', () => {
      expect(
        fixture.debugElement
          .queryAll(By.directive(HeroComponent))
          .every(heroComponentFixture =>
            TEST_HEROES.includes(heroComponentFixture.componentInstance.hero)
          )
      ).toEqual(true);
    });

    it("should call the delete method when a hero's delete emitter fires", () => {
      const heroComponent = fixture.debugElement.query(
        By.directive(HeroComponent)
      );

      heroComponent.triggerEventHandler(
        'delete',
        heroComponent.componentInstance.hero
      );
      fixture.detectChanges();

      // ----- This would have also worked:
      // heroComponent.delete.emit(heroComponent.hero);
      // ----- or
      // heroComponentFixture.query(By.css('button')).triggerEventHandler('click', {
      //   stopPropagation: () => {}
      // })

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(
        heroComponent.componentInstance.hero
      );
    });
  });
});
