import { 
   Component,
   OnInit, 
   ElementRef, 
   ViewChild, 
   OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from "rxjs/Subscription";

import { Ingredient } from '../../shared/ingredient.model';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  editSubscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.editSubscription = this.store.select('shoppingList')
      .subscribe(data => {
        if(data.editedIngredientIndex > -1){
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.slForm.setValue({
            'name': this.editedItem.name,
            'amount': this.editedItem.amount
          });
        } else{
          this.editMode = false;
        }
      });
  }

  onSubmitItem(form: NgForm){
    const newIngredient = new Ingredient(form.value.name, form.value.amount);

    if(this.editMode){
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}))
    } else{
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }

    this.slForm.reset();
    this.editMode = false;
  }

  onDeleteItem(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.slForm.reset();
    this.editMode = false;
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(){
    this.store.dispatch(new ShoppingListActions.StopEditing());
    this.editSubscription.unsubscribe();
  }
}
