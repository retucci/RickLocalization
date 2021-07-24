import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { RickComponent } from './rick/rick.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'rick', component: RickComponent},
  {path: 'rick/:id/detail', component: RickComponent},
  {path: 'rick/:id/detail/history', component: HistoryComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
