import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { MatDialog } from '@angular/material/dialog';
import { IndividualMatchScoreComponent } from '../individual-match-score/individual-match-score.component';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
})
export class ScoreBoardComponent implements OnInit {
  yesterdayMatchesScores: any = [];

  todaysDateWithFullDetails: any = [];

  allCompletedMatches: any = [];

  myMatches: any = [];

  noResult: any;

  UserOverallScoreWithFullDetails: any = [];

  constructor(
    private apiService: ApiService,
    private storage: LocalStorageService,
    public dialog: MatDialog,
    private authenticationSrvice: AuthenticationService
  ) {}

  userEmail = this.authenticationSrvice.userData.email;

  ngOnInit(): void {
    this.apiService.MatchesByTodaysDateWithFullDetails().then((res) => {
      for (var i = 0; i < res.length; i++) {
        this.todaysDateWithFullDetails = res;
        res[i].resultAwait = 'R';
        if (res[i].match_completed == false) {
          res[i].resultAwait = 'Result Awaited !';
        } else {
          this.apiService.getYerstadyScores(res[i].mid).then((scoreResult) => {
            this.yesterdayMatchesScores = scoreResult;
            if (scoreResult.length == 0) {
              this.noResult = 'No Result Found !';
            }
          });
        }
      }
    });

    // for all completed matches;
    this.apiService.allCompletedMatches().then((res) => {
      this.allCompletedMatches = res;
    });

    // for my matches;
    this.apiService.myMatches(this.userEmail).then((res) => {
      this.myMatches = res;
    });

    // overall score
    this.apiService.UserOverallScoreWithFullDetails().then((res) => {
      this.UserOverallScoreWithFullDetails = res;
    });
  }

  // for all completed matches to extract individual team
  getMatchDetails(matchID: any, teamTitle: any) {
    const dialogRef = this.dialog.open(IndividualMatchScoreComponent, {
      data: { matchID: matchID, teamTitel: teamTitle },
    });
  }
}
