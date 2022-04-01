import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FantacyTeamComponent } from './fantacy-team/fantacy-team.component';
import { LoginComponent } from './login/login.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { SelectCaptainComponent } from './select-captain/select-captain.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { SignoutComponent } from './signout/signout.component';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { TeamPreviewComponent } from './team-preview/team-preview.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IndividualMatchScoreComponent } from './individual-match-score/individual-match-score.component';
import { PointsDetailsComponent } from './points-details/points-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderInterceptor } from './Services/api.httpinterceptor';
import { AuthenticationService } from './Services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateTeamComponent,
    DashboardComponent,
    FantacyTeamComponent,
    LoginComponent,
    ScoreBoardComponent,
    SelectCaptainComponent,
    SignoutComponent,
    TeamPreviewComponent,
    IndividualMatchScoreComponent,
    PointsDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    SocialLoginModule,
    NgxWebstorageModule.forRoot(),
    MatListModule,
    MatDialogModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    NgxSpinnerModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      // multi: true,
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '177033085389-3ifnf4cv034aob0luabim0l3skosg1uh.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
      deps: [AuthenticationService, Router],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
