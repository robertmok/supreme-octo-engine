import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlphaComponent } from './alpha/alpha.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'alpha', component: AlphaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
