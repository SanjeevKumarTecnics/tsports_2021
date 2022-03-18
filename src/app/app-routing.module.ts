import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTeamComponent } from './create-team/create-team.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FantacyTeamComponent } from './fantacy-team/fantacy-team.component';
import { LoginComponent } from './login/login.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { PointsDetailsComponent } from './points-details/points-details.component';
import { HomeGaurd } from './gurdAuthentication';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'create-team',
    component: CreateTeamComponent,
    canActivate: [HomeGaurd],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [HomeGaurd],
  },
  {
    path: 'fantacy-team',
    component: FantacyTeamComponent,
    canActivate: [HomeGaurd],
  },
  {
    path: 'scoreboard',
    component: ScoreBoardComponent,
    canActivate: [HomeGaurd],
  },
  {
    path: 'pointsdetails',
    component: PointsDetailsComponent,
    canActivate: [HomeGaurd],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '**',
    component: FantacyTeamComponent,
    canActivate: [HomeGaurd],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
