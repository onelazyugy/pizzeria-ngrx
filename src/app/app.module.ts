import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromApp from './store/app.reducer';
import { PizzaModule } from './pages/pizza/pizza.module';
import { environment } from 'src/environments/environment';
import { clearState } from './pages/pizza/checkout/start/store/start.reducer';
import { RegisterModule } from './pages/register/register.module';
import { LoginModule } from './pages/login/login.module';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffects } from './pages/register/store/register.effect';
import { LoginEffects } from './pages/login/store/login.effect';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule,

    //wire up the store with all of the app reducers
    StoreModule.forRoot(fromApp.appReducer, {metaReducers: [clearState]}), //metaReducers is for clearing the store upon logout
    EffectsModule.forRoot([RegisterEffects, LoginEffects]),
    //ngrxdevtools
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    PizzaModule,
    RegisterModule,
    LoginModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
