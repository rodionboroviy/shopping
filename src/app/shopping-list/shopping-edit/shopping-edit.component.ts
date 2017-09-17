import { 
   Component,
   OnInit, 
   ElementRef, 
   ViewChild, 
   OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from "rxjs/Subscription";

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  editSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.editSubscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({
            'name': this.editedItem.name,
            'amount': this.editedItem.amount
          });
        }
      );
  }

  onSubmitItem(form: NgForm){
    const newIngredient = new Ingredient(form.value.name, form.value.amount);

    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else{
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.slForm.reset();
    this.editMode = false;
  }

  onDeleteItem(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.slForm.reset();
    this.editMode = false;
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(){
    this.editSubscription.unsubscribe();
  }
}
