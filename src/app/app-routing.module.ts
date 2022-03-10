import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTeamComponent } from './create-team/create-team.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FantacyTeamComponent } from './fantacy-team/fantacy-team.component';
import { LoginComponent } from './login/login.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { PointsDetailsComponent } from './points-details/points-details.component';

const routes: Routes = [
  { path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'create-team',
    component: CreateTeamComponent
  },
  { path: 'dashboard',
    component: DashboardComponent
  }
  ,
  { path: 'fantacy-team',
    component: FantacyTeamComponent
  },
  { path: 'scoreboard',
    component: ScoreBoardComponent
  },
  { path: 'pointsdetails',
    component: PointsDetailsComponent
  },
  { path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { path: '**', component: FantacyTeamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
