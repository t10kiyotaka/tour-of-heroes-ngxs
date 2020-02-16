import { Action, State, StateContext } from '@ngxs/store';
import { Hero } from '../hero';
import * as HeroActions from './hero.action';

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
export class HeroState {


  @Action(HeroActions.Add)
  addHero(ctx: StateContext<HeroStateModel>, action: HeroActions.Add) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      heroes: [...state.heroes, action.payload]
    });
  }
}
