import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBookComponent } from './components/list-book/list-book.component';
import { NewBookComponent } from './components/new-book/new-book.component';

const routes: Routes = [
  { path: 'list', component: ListBookComponent },
  { path: 'new', component: NewBookComponent },
  { path: '**', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
