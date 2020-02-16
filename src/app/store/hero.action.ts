import { Hero } from '../hero';

export class Add {
  static readonly type = '[Hero] Add';
  constructor(public payload: Hero) {}
}

