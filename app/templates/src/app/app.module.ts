import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { CoreModule } from './core/core.module';

import { AppMainComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CoreModule
  ],
  declarations: [
    AppMainComponent,
    HomeComponent
  ],
  providers: [],
  bootstrap: [
    AppMainComponent
  ]
})
export class AppModule {}
