import { Hero } from '../hero';

export class AddHero {
  static readonly type = '[Hero] Add Hero';
  constructor(public payload: Hero) {}
}

export class GetHeroes {
  static readonly type = '[Hero] Get Heroes';
}

export class UpdateHero {
  static readonly type = '[Hero] Update Hero';
  constructor(public payload: Hero) {}
}

export class DeleteHero {
  static readonly type = '[Hero] Delete Hero';
  constructor(public payload: number) {}
}
