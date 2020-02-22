import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Select, Store } from '@ngxs/store';
import * as HeroActions from '../store/hero.action';
import { Observable, of } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  // @Select(state => state.heroes) heroes$: Observable<Hero[]>;
  heroes = [];

  constructor(
    private heroService: HeroService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    // TODO: Check withLatestFrom
    this.store.dispatch(new HeroActions.GetHeroes())
      .pipe(withLatestFrom(this.heroes))
      .subscribe(([_, heroes]) => {
        this.heroes = heroes;
      });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    // this.store.dispatch(new HeroActions.AddHero({ name } as Hero));
  }

  delete(hero: Hero): void {
    // this.store.dispatch(new HeroActions.DeleteHero(hero));
  }
}
