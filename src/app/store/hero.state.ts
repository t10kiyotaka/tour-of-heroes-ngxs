import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Hero } from '../hero';
import * as HeroActions from './hero.action';
import { HeroService } from '../hero.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

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

  @Selector()
  static heroes(state: HeroStateModel) {
    return state.heroes;
  }

  @Selector()
  static selectedHero(state: HeroStateModel) {
    return state.selectedHero;
  }

  @Action(HeroActions.GetHero)
  getHero(ctx: StateContext<HeroStateModel>, action: HeroActions.GetHero) {
    return this.heroService.getHero(action.payload).pipe(
      tap((resData: Hero) => {
        ctx.patchState({ selectedHero: resData });
      })
    );
  }

  @Action(HeroActions.GetHeroes)
  getHeroes(ctx: StateContext<HeroStateModel>) {
    return this.heroService.getHeroes().pipe(
      tap((resData: Hero[]) => {
        ctx.patchState({ heroes: resData });
      })
    );
  }

  @Action(HeroActions.AddHero)
  addHero(ctx: StateContext<HeroStateModel>, action: HeroActions.AddHero) {
    return this.heroService.addHero(action.payload).pipe(
      tap((resData: Hero) => {
        const state = ctx.getState();
        ctx.patchState({ heroes: [...state.heroes, resData] });
      })
    );
  }

  @Action(HeroActions.UpdateHero)
  updateHero(ctx: StateContext<HeroStateModel>, action: HeroActions.UpdateHero) {
    const heroForUpdate = action.payload;
    return this.heroService.updateHero(heroForUpdate).pipe(
      tap((resData: Hero) => {
        const state = ctx.getState();
        const updatedHeroes = state.heroes.map(hero => {
          if (hero.id === heroForUpdate.id) { return heroForUpdate; }
        });
        ctx.patchState({ heroes: updatedHeroes });
      })
    );
  }

  @Action(HeroActions.DeleteHero)
  deleteHero(ctx: StateContext<HeroStateModel>, action: HeroActions.DeleteHero) {
    return this.heroService.deleteHero(action.payload).pipe(
      tap(() => {
        const state = ctx.getState();
        const updatedHeroes = state.heroes.filter(hero => hero.id !== action.payload);
        ctx.patchState({ heroes: updatedHeroes });
      })
    );
  }
}
