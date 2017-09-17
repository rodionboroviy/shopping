import { Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Tasty Schnitzel',
            'A supper-tasty schnitzel - just awesome!',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Schnitzel.JPG/1600px-Schnitzel.JPG',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]
        ),
        new Recipe(
            'Big Fat Burger',
            'What else you need to say?',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg/1600px-Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ]
        )
      ];
      
      constructor(private shoppingListService: ShoppingListService) {
      }

      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(id: number){
          return this.recipes[id];
      }

      addIngredientsToShoppingList(ingredietns: Ingredient[]){
          this.shoppingListService.addIngredients(ingredietns);
      }

      addRecipe(recipe: Recipe){
          this.recipes.push(recipe);
          this.recipesChanged.next(this.getRecipes());
      }

      updateRecipe(id: number, newRecipe: Recipe){
          this.recipes[id] = newRecipe;
          this.recipesChanged.next(this.getRecipes());
      }

      deleteRecipe(index: number){
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.getRecipes());
      }
}