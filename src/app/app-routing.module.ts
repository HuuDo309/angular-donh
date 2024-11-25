import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogCreateEditComponent } from './blog-create-edit/blog-create-edit.component';
import { BlogListComponent } from './blogs-list/blogs-list.component';
import { BlogsSearchComponent } from './blogs-search/blogs-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/blogs-list', pathMatch: 'full'},
  { path: 'blogs-list', component: BlogListComponent},
  { path: 'search', component: BlogsSearchComponent},
  { path: 'create', component: BlogCreateEditComponent},
  { path: 'edit/:id', component: BlogCreateEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
