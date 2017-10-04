import { Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];
      
      constructor(private shoppingListService: ShoppingListService) {
      }

      setRecipes(recipes: Recipe[]){
          this.recipes = recipes;
          this.recipesChanged.next(this.getRecipes());
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