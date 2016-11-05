import { enableProdMode } from '@angular/core';
import { NgModule } from "@angular/core";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './src/app.module';



if ('production' === ENV) {
  // Production
  enableProdMode();
} else {
  // Development
}

platformBrowserDynamic().bootstrapModule(AppModule);
