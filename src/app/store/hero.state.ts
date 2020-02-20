import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Hero } from '../hero';
import * as HeroActions from './hero.action';
import { HeroService } from '../hero.service';
import { tap } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';

export interface HeroStateModel {
  selectedHero: Hero;
  heroes: Hero[];
}

@State<HeroStateModel>({
  name: 'hero',
  defaults: {
    selectedHero: null,
    heroes: []
  }
})
@Injectable({
  providedIn: 'root'
})
export class HeroState {

  constructor(private heroService: HeroService) {}

  // TODO: Check below @Selector is needed or not.

  @Selector()
  static getHeroes(state: HeroStateModel) {
    return state.heroes;
  }

  @Selector()
  static getHero(state: HeroStateModel) {
    return state.selectedHero;
  }

  @Action(HeroActions.FetchHeroes)
  fetchHero(ctx: StateContext<HeroStateModel>) {
    this.heroService.getHeroes().pipe(
      tap((data) => {
        ctx.patchState({ heroes: data });
      })
    );
  }

  @Action(HeroActions.AddHero)
  addHero(ctx: StateContext<HeroStateModel>, action: HeroActions.AddHero) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      heroes: [...state.heroes, action.payload]
    });
  }

  @Action(HeroActions.DeleteHero)
  deleteHero(ctx: StateContext<HeroStateModel>, action: HeroActions.DeleteHero) {
    this.heroService.deleteHero(action.payload);
    this.fetchHero(ctx);
  }
}
