import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlphaComponent } from './alpha.component';
import { BetaComponent } from '../beta/beta.component';

// import { define } from "hybrids";
// import SimpleCounter from "../../sample";

// Define imported web component
// define("simple-counter", SimpleCounter);

@NgModule({
  declarations: [
    AlphaComponent,
    BetaComponent
  ],
  imports: [
    CommonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AlphaModule { }
