import { Hero } from '../hero';

export class AddHero {
  static readonly type = '[Hero] Add Hero';
  constructor(public payload: Hero) {}
}

export class FetchHeroes {
  static readonly type = '[Hero] Fetch Heroes';
}

export class DeleteHero {
  static readonly type = '[Hero] Delete Hero';
  constructor(public payload: Hero | number) {}
}
