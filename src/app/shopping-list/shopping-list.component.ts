import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from "./shopping-list.service";


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Ingredient[];
  private subsctiprion: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subsctiprion = this.shoppingListService.ingredientsChanged
            .subscribe(
              (ingredients: Ingredient[]) => {
                this.ingredients = ingredients;
              }
            )
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subsctiprion.unsubscribe();
  }
}
