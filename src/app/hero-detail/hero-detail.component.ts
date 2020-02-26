import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import * as HeroActions from '../store/hero.action';
import { HeroState } from '../store/hero.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Select(HeroState.selectedHero) hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new HeroActions.GetHero(id));
  }

  goBack(): void {
    this.location.back();
  }

  save(hero: Hero) {
    this.store.dispatch(new HeroActions.UpdateHero(hero))
      .subscribe(() => this.goBack());
  }
}
