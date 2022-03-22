import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { MatDialog } from '@angular/material/dialog';
import { SelectCaptainComponent } from '../select-captain/select-captain.component';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: LocalStorageService,
    public dialog: MatDialog
  ) {}

  teamAPlayers: any = [];
  teamBPlayers: any = [];

  totalTeams: any = [];

  teamAName: any;
  teamBName: any;

  maxWKCount: any = 0;
  maxBATCount: any = 0;
  maxALCount: any = 0;
  maxBOLCount: any = 0;
  maxPalyers: number = 0;
  maxTeam1Count: number = 0;
  maxTeam2Count: number = 0;

  dreamTeam: any = [];

  nextButton: boolean = false;

  selectedTab: number = 0;

  ngOnInit(): void {
    // check whether paremeter are passed or not
    if (
      window.location.pathname.indexOf(';teamA') == -1 ||
      window.location.pathname.indexOf(';teamB') == -1
    ) {
      this.router.navigate(['/fantacy-team']);
    } else {
      // check whether parameter are valid or not
      if (this.activatedRoute.snapshot.paramMap.get('teamA')) {
        try {
          this.teamAName = JSON.parse(
            this.apiService.decryptionAES(
              this.activatedRoute.snapshot.paramMap.get('teamA')
            )
          );
        } catch (e) {
          alert('Wrong Input');
        }
      }
      if (this.activatedRoute.snapshot.paramMap.get('teamB')) {
        try {
          this.teamBName = JSON.parse(
            this.apiService.decryptionAES(
              this.activatedRoute.snapshot.paramMap.get('teamB')
            )
          );
        } catch (e) {
          alert('Wrong Input');
        }
      }
      // checking for null parameter
      if (
        this.teamAName == null ||
        this.teamAName == '' ||
        this.teamBName == null ||
        this.teamBName == ''
      ) {
        alert('Something Went Wrong');
        this.router.navigate(['/fantacy-team']);
      } else {
        this.apiService
          .getPlayers(this.teamAName, this.teamBName)
          .then((res: any) => {
            for (var i = 0; i < res.length; i++) {
              // adding additional vars
              res[i].selectedWK = false;
              res[i].selectedBAT = false;
              res[i].selectedAL = false;
              res[i].selectedBOL = false;
              res[i].maxTeam1 = false;
              res[i].maxTeam2 = false;
              res[i].disabled = '';
              res[i].checked = false;
              if (res[i].team == this.teamAName) {
                this.teamAPlayers.push(res[i]);
              }
              if (res[i].team == this.teamBName) {
                this.teamBPlayers.push(res[i]);
              }
              this.totalTeams.push(res[i]);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }

  tabChagned(event: any) {
    this.selectedTab = event.index;
  }

  changeStatus(event: any) {
    // console.log(event.currentTarget.checked);
    if (event.currentTarget.checked) {
      if (this.maxPalyers < 11) {
        // incrementing selected players count
        this.maxPalyers += 1;

        for (var i = 0; i < this.totalTeams.length; i++) {
          if (this.totalTeams[i].pid == event.currentTarget.id) {
            // storing slected players
            if (
              !this.dreamTeam
                .map((x: any) => x.pid)
                .includes(this.totalTeams[i].pid)
            ) {
              this.dreamTeam.push(this.totalTeams[i]);
              this.totalTeams[i].checked = true;
              // console.log(this.dreamTeam);
            }

            // filtering WK
            if (this.totalTeams[i].category == 'W') {
              this.maxWKCount += 1;
              this.totalTeams[i].selectedWK = true;
              if (this.maxWKCount >= 2) {
                this.disabledWK();
              }
              if (this.totalTeams[i].team == this.teamAName) {
                this.maxTeam1Count += 1;
                this.totalTeams[i].maxTeam1 = true;
                if (this.maxTeam1Count >= 7) {
                  this.maxTeam1Players();
                }
              }
              if (this.totalTeams[i].team == this.teamBName) {
                this.maxTeam2Count += 1;
                this.totalTeams[i].maxTeam2 = true;
                if (this.maxTeam2Count >= 7) {
                  this.maxTeam2Players();
                }
              }
            }

            // filtering BAT
            if (this.totalTeams[i].category == 'B') {
              this.maxBATCount += 1;
              this.totalTeams[i].selectedBAT = true;
              if (this.maxBATCount >= 4) {
                this.disabledBAT();
              }
              if (this.totalTeams[i].team == this.teamAName) {
                this.maxTeam1Count += 1;
                this.totalTeams[i].maxTeam1 = true;
                if (this.maxTeam1Count >= 7) {
                  this.maxTeam1Players();
                }
              }
              if (this.totalTeams[i].team == this.teamBName) {
                this.maxTeam2Count += 1;
                this.totalTeams[i].maxTeam2 = true;
                if (this.maxTeam2Count >= 7) {
                  this.maxTeam2Players();
                }
              }
            }

            // filtering AL
            if (this.totalTeams[i].category == 'AL') {
              this.maxALCount += 1;
              this.totalTeams[i].selectedAL = true;
              if (this.maxALCount >= 2) {
                this.disabledAL();
              }
              if (this.totalTeams[i].team == this.teamAName) {
                this.maxTeam1Count += 1;
                this.totalTeams[i].maxTeam1 = true;
                if (this.maxTeam1Count >= 7) {
                  this.maxTeam1Players();
                }
              }
              if (this.totalTeams[i].team == this.teamBName) {
                this.maxTeam2Count += 1;
                this.totalTeams[i].maxTeam2 = true;
                if (this.maxTeam2Count >= 7) {
                  this.maxTeam2Players();
                }
              }
            }

            // filtering BOL
            if (this.totalTeams[i].category == 'BL') {
              this.maxBOLCount += 1;
              this.totalTeams[i].selectedBOL = true;
              if (this.maxBOLCount >= 3) {
                this.disabledBOL();
              }
              if (this.totalTeams[i].team == this.teamAName) {
                this.maxTeam1Count += 1;
                this.totalTeams[i].maxTeam1 = true;
                if (this.maxTeam1Count >= 7) {
                  this.maxTeam1Players();
                }
              }
              if (this.totalTeams[i].team == this.teamBName) {
                this.maxTeam2Count += 1;
                this.totalTeams[i].maxTeam2 = true;
                if (this.maxTeam2Count >= 7) {
                  this.maxTeam2Players();
                }
              }
            }
          }
        }
      }
      if (this.maxPalyers == 11) {
        this.maxPalyers = 11;
        this.nextButton = true;
      }
    } else {
      this.maxPalyers -= 1;
      this.nextButton = false;

      // storing slected players
      var dreamTeamHolder = this.dreamTeam;
      this.dreamTeam = dreamTeamHolder.filter((player: any, i: any) => {
        return player.pid != event.currentTarget.id;
      });

      for (var k = 0; k < this.totalTeams.length; k++) {
        if (this.totalTeams[k].pid == event.currentTarget.id) {
          // this.dreamTeam.pop(this.totalTeams[k]);
          this.totalTeams[k].checked = false;

          // filtering and WK
          if (this.totalTeams[k].category == 'W') {
            this.maxWKCount -= 1;
            this.totalTeams[k].selectedWK = false;
            if (this.maxWKCount < 2) {
              this.enabledWK();
            }
            if (this.totalTeams[k].team == this.teamAName) {
              this.maxTeam1Count -= 1;
              if (this.maxTeam1Count < 7) {
                this.totalTeams[k].maxTeam1 = false;
                this.eanbledMaxTeam1Players();
              }
            }
            if (this.totalTeams[k].team == this.teamBName) {
              this.maxTeam2Count -= 1;
              if (this.maxTeam2Count < 7) {
                this.totalTeams[k].maxTeam2 = false;
                this.eanbledMaxTeam2Players();
              }
            }
          }

          // filtering BAT
          if (this.totalTeams[k].category == 'B') {
            this.maxBATCount -= 1;
            this.totalTeams[k].selectedBAT = false;
            if (this.maxBATCount < 4) {
              this.enabledBAT();
            }
            if (this.totalTeams[k].team == this.teamAName) {
              this.maxTeam1Count -= 1;
              if (this.maxTeam1Count < 7) {
                this.totalTeams[k].maxTeam1 = false;
                this.eanbledMaxTeam1Players();
              }
            }
            if (this.totalTeams[k].team == this.teamBName) {
              this.maxTeam2Count -= 1;
              if (this.maxTeam2Count < 7) {
                this.totalTeams[k].maxTeam2 = false;
                this.eanbledMaxTeam2Players();
              }
            }
          }

          // filtering AL
          if (this.totalTeams[k].category == 'AL') {
            this.maxALCount -= 1;
            this.totalTeams[k].selectedAL = false;
            if (this.maxALCount < 2) {
              this.enabledAL();
            }
            if (this.totalTeams[k].team == this.teamAName) {
              this.maxTeam1Count -= 1;
              if (this.maxTeam1Count < 7) {
                this.totalTeams[k].maxTeam1 = false;
                this.eanbledMaxTeam1Players();
              }
            }
            if (this.totalTeams[k].team == this.teamBName) {
              this.maxTeam2Count -= 1;
              if (this.maxTeam2Count < 7) {
                this.totalTeams[k].maxTeam2 = false;
                this.eanbledMaxTeam2Players();
              }
            }
          }

          // filtering BOL
          if (this.totalTeams[k].category == 'BL') {
            this.maxBOLCount -= 1;
            this.totalTeams[k].selectedBOL = false;
            if (this.maxBOLCount < 3) {
              this.enabledBOL();
            }
            if (this.totalTeams[k].team == this.teamAName) {
              this.maxTeam1Count -= 1;
              if (this.maxTeam1Count < 7) {
                this.totalTeams[k].maxTeam1 = false;
                this.eanbledMaxTeam1Players();
              }
            }
            if (this.totalTeams[k].team == this.teamBName) {
              this.maxTeam2Count -= 1;
              if (this.maxTeam2Count < 7) {
                this.totalTeams[k].maxTeam2 = false;
                this.eanbledMaxTeam2Players();
              }
            }
          }
        }
      }
    }
  }

  disabledWK() {
    for (var p = 0; p < this.totalTeams.length; p++) {
      if (this.totalTeams[p].category == 'W') {
        if (!(this.totalTeams[p].selectedWK == true)) {
          this.totalTeams[p].disabled = true;
        }
      }
    }
  }
  enabledWK() {
    for (var p = 0; p < this.totalTeams.length; p++) {
      if (this.totalTeams[p].category == 'W') {
        this.totalTeams[p].disabled = '';
        if (this.maxTeam1Count >= 7) {
          if (this.totalTeams[p].team == this.teamAName) {
            if (!(this.totalTeams[p].maxTeam1 == true)) {
              this.totalTeams[p].disabled = true;
            }
          }
        }
        if (this.maxTeam2Count >= 7) {
          if (this.totalTeams[p].team == this.teamBName) {
            if (!(this.totalTeams[p].maxTeam2 == true)) {
              this.totalTeams[p].disabled = true;
            }
          }
        }
      }
    }
  }

  disabledBAT() {
    for (var p = 0; p < this.totalTeams.length; p++) {
      if (this.totalTeams[p].category == 'B') {
        if (!(this.totalTeams[p].selectedBAT == true)) {
          this.totalTeams[p].disabled = true;
        }
      }
    }
  }

  enabledBAT() {
    for (var p = 0; p < this.totalTeams.length; p++) {
      if (this.totalTeams[p].category == 'B') {
        this.totalTeams[p].disabled = '';
        if (this.maxTeam1Count >= 7) {
          if (this.totalTeams[p].team == this.teamAName) {
            if (!(this.totalTeams[p].maxTeam1 == true)) {
              this.totalTeams[p].disabled = true;
            }
          }
        }
        if (this.maxTeam2Count >= 7) {
          if (this.totalTeams[p].team == this.teamBName) {
            if (!(this.totalTeams[p].maxTeam2 == true)) {
              this.totalTeams[p].disabled = true;
            }
          }
        }
      }
    }
  }

  disabledAL() {
    for (var p = 0; p < this.totalTeams.length; p++) {
      if (this.totalTeams[p].category == 'AL') {
        if (!(this.totalTeams[p].selectedAL == true)) {
          this.totalTeams[p].disabled = true;
        }
      }
    }
  }

  enabledAL() {
    for (var p = 0; p < this.totalTeams.length; p++) {
      if (this.totalTeams[p].category == 'AL') {
        this.totalTeams[p].disabled = '';
        if (this.maxTeam1Count >= 7) {
          if (this.totalTeams[p].team == this.teamAName) {
            if (!(this.totalTeams[p].maxTeam1 == true)) {
              this.totalTeams[p].disabled = true;
            }
          }
        }
        if (this.maxTeam2Count >= 7) {
          if (this.totalTeams[p].team == this.teamBName) {
            if (!(this.totalTeams[p].maxTeam2 == true)) {
              this.totalTeams[p].disabled = true;
            }
          }
        }
      }
    }
  }

  disabledBOL() {
    for (var p = 0; p < this.totalTeams.length; p++) {
      if (this.totalTeams[p].category == 'BL') {
        if (!(this.totalTeams[p].selectedBOL == true)) {
          this.totalTeams[p].disabled = true;
        }
      }
    }
  }

  enabledBOL() {
    for (var p = 0; p < this.totalTeams.length; p++) {
      if (this.totalTeams[p].category == 'BL') {
        this.totalTeams[p].disabled = '';
        if (this.maxTeam1Count >= 7) {
          if (this.totalTeams[p].team == this.teamAName) {
            if (!(this.totalTeams[p].maxTeam1 == true)) {
              this.totalTeams[p].disabled = true;
            }
          }
        }
        if (this.maxTeam2Count >= 7) {
          if (this.totalTeams[p].team == this.teamBName) {
            if (!(this.totalTeams[p].maxTeam2 == true)) {
              this.totalTeams[p].disabled = true;
            }
          }
        }
      }
    }
  }

  // incrementing team count
  maxTeam1Players() {
    for (var p = 0; p < this.totalTeams.length; p++) {
      if (this.totalTeams[p].team == this.teamAName) {
        if (!(this.totalTeams[p].maxTeam1 == true)) {
          this.totalTeams[p].disabled = true;
        }
      }
    }
  }

  maxTeam2Players() {
    for (var p = 0; p < this.totalTeams.length; p++) {
      if (this.totalTeams[p].team == this.teamBName) {
        if (!(this.totalTeams[p].maxTeam2 == true)) {
          this.totalTeams[p].disabled = true;
        }
      }
    }
  }

  eanbledMaxTeam1Players() {
    for (var p = 0; p < this.totalTeams.length; p++) {
      if (this.totalTeams[p].category == this.teamAName) {
        this.totalTeams[p].disabled = false;
      }
    }
  }

  eanbledMaxTeam2Players() {
    for (var p = 0; p < this.totalTeams.length; p++) {
      if (this.totalTeams[p].category == this.teamBName) {
        this.totalTeams[p].disabled = false;
      }
    }
  }

  selectCaptain() {
    const dialogRef = this.dialog.open(SelectCaptainComponent);
    this.apiService.selectedPlayers = this.dreamTeam;
  }
}
