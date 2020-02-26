import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Select, Store } from '@ngxs/store';
import * as HeroActions from '../store/hero.action';
import { Observable } from 'rxjs';
import { HeroState } from '../store/hero.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  @Select(HeroState.heroes) heroes$: Observable<Hero[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new HeroActions.GetHeroes());
  }

}
