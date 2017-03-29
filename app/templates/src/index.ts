// Import scripts
import './app/polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Import styles
import './styles/main.styl';

import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';

if (ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
