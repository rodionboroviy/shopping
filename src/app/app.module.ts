import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';

import { AppRoutingModule } from "./app-routing.module";
import { AuthGuard } from "./auth/auth-guard.service";

import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./core/core.module";

import { reducers } from './store/app.reducers';
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ShoppingListModule,
    SharedModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
