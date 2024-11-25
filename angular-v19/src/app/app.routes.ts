import { RouterModule, Routes } from '@angular/router';
import { UserCardComponent } from './user-card/user-card.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserCard } from './models/user-card';
import { UserCardDetailComponent } from './user-card-detail/user-card-detail.component';

export const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'usercard', component: UserCardComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'detail/:id', component: UserCardDetailComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }