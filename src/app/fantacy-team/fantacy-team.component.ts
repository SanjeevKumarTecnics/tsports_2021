import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationExtras,
} from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-fantacy-team',
  templateUrl: './fantacy-team.component.html',
  styleUrls: ['./fantacy-team.component.scss'],
})
export class FantacyTeamComponent implements OnInit {
  matchByDate: any = [];

  matchExited: any = [];

  userName: any;

  todayMatchDate: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private storage: LocalStorageService,
    private authenticationSrvice: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.apiService
      .getMatchByDate()
      .then((res) => {
        this.matchByDate = res;
        this.todayMatchDate = res[0].date;
        var email = this.authenticationSrvice.userData.email;
        this.userName = email.split('@')[0];
        const length = res.length;
        for (let i = 0; i < length; i++) {
          this.apiService
            .userAlredyExistedInMatch(this.userName, res[i].mid)
            .then((res) => {
              try {
                if (res[0].length > 0) {
                  this.matchExited[i] = res.map((x: any) => x.length > 0)[0];
                }
              } catch (error) {
                this.matchExited[i] = true;
              }
            });
        }
      })
      .catch((err: any) => console.error(err));
  }

  gotoCreateTeam(teamA: any, teamB: any, matchId: any) {
    var encTeamA = this.apiService.encryptionAES(JSON.stringify(teamA));
    var encTeamB = this.apiService.encryptionAES(JSON.stringify(teamB));
    this.router.navigate([
      '/create-team',
      { teamA: encTeamA, teamB: encTeamB },
    ]);
    this.storage.store('matchID', matchId);
    this.apiService.matchId = matchId;
  }

  gotoDashboard(matchid: any, username: any) {
    var encmatchid = this.apiService.encryptionAES(JSON.stringify(matchid));
    var encusername = this.apiService.encryptionAES(JSON.stringify(username));
    this.router.navigate([
      '/dashboard',
      { matchId: encmatchid, userName: encusername },
    ]);
  }
}
