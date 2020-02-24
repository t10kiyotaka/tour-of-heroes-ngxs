import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Select, Store } from '@ngxs/store';
import * as HeroActions from '../store/hero.action';
import { Observable, of } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { HeroState } from '../store/hero.state';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  @Select(HeroState.heroes) heroes$: Observable<Hero[]>;

  constructor(
    private heroService: HeroService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.store.dispatch(new HeroActions.GetHeroes());
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.store.dispatch(new HeroActions.AddHero({ name } as Hero));
  }

  delete(hero: Hero): void {
    this.store.dispatch(new HeroActions.DeleteHero(hero.id));
  }
}
