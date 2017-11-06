import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { Ingredient } from '../shared/ingredient.model';
import * as fromShoppingList from './store/shopping-list.redusers';
import * as ShoppingListActions from './store/shopping-list.actions';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number){
    this.store.dispatch(new ShoppingListActions.StartEditing(index));
  }
}
