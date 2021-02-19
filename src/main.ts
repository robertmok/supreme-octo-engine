import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// Add shims and polyfills
// import "@webcomponents/webcomponentsjs/webcomponents-bundle.js";

// import { define } from "hybrids";
// import SimpleCounter from "./sample";

// // Define imported web component
// define("simple-counter", SimpleCounter);
