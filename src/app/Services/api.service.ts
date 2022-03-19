import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import * as CryptoTS from 'crypto-ts';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  selectedPlayers: any = [];

  // sideNav
  userPhoto: any;
  userEmail: any;

  // login credentials
  matchId: any;
  userId: any;

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
    private authService: SocialAuthService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  baseUrl = 'https://tsports.tecnicslabs.com/';

  async getPlayers(teamA: any, teamB: any) {
    return new Promise<any>((resolve, reject) => {
      let response = this.http.get(
        this.baseUrl +
          'api/playersByTeamTitles/?teamA=' +
          teamA +
          '&teamB=' +
          teamB
      );
      response.subscribe((data) => {
        resolve(data);
      });
    });
  }

  async getTeamLogo() {
    return new Promise<any>((resolve, reject) => {
      let response = this.http.get(this.baseUrl + 'api/team/');
      response.subscribe((data) => {
        resolve(data);
      });
    });
  }

  async getUserIdByMail(email: any) {
    return new Promise<any>((resolve, reject) => {
      let response = this.http.get(
        this.baseUrl + 'api/userIdByEmail/?email=' + email
      );
      response.subscribe((data) => {
        resolve(data);
      });
    });
  }

  async getMatchByDate() {
    return new Promise<any>((resolve, reject) => {
      let response = this.http.get(this.baseUrl + 'api/matchesByDate/');
      response.subscribe((data) => {
        resolve(data);
      });
    });
  }

  async postSelectPlayers(data: any) {
    return new Promise<any>((resolve, reject) => {
      let response = this.http.post(this.baseUrl + 'api/dreamTeams/', data);
      response.subscribe((data) => {
        resolve(data);
      });
    });
  }

  async allMatches() {
    return new Promise<any>((resolve, reject) => {
      let response = this.http.get(this.baseUrl + 'api/match/');
      response.subscribe((data) => {
        resolve(data);
      });
    });
  }

  async userAlredyExistedInMatch(userName: any, matchId: any) {
    return new Promise<any>((resolve, reject) => {
      let response = this.http.get(
        this.baseUrl +
          'api/DreamTeamByUIDandMatchID/?user=' +
          userName +
          '&match=' +
          matchId
      );
      response.subscribe((data) => {
        resolve(data);
      });
    });
  }

  async getYerstadyScores(id: any) {
    return new Promise<any>((resolve, reject) => {
      let response = this.http.get(
        this.baseUrl + 'api/dreamTeamByMatchId/?id=' + id
      );
      response.subscribe((data) => {
        resolve(data);
      });
    });
  }

  async allCompletedMatches() {
    return new Promise<any>((resolve, reject) => {
      let response = this.http.get(this.baseUrl + 'api/AllCompletedMatches/');
      response.subscribe((data) => {
        resolve(data);
      });
    });
  }

  async myMatches(user: any) {
    return new Promise<any>((resolve, reject) => {
      let response = this.http.get(
        this.baseUrl + 'api/dreamTeamByUID/?user=' + user
      );
      response.subscribe((data) => {
        resolve(data);
      });
    });
  }

  async MatchesByTodaysDateWithFullDetails() {
    return new Promise<any>((resolve, reject) => {
      let response = this.http.get(
        this.baseUrl + 'api/MatchesByTodaysDateWithFullDetails/'
      );
      response.subscribe((data) => {
        resolve(data);
      });
    });
  }

  async UserOverallScoreWithFullDetails() {
    return new Promise<any>((resolve, reject) => {
      let response = this.http.get(
        this.baseUrl + 'api/UserOverallScoreWithFullDetails/'
      );
      response.subscribe((data) => {
        resolve(data);
      });
    });
  }

  // for encryption and decription
  key: string = 'z!!!!!!!1sdfadsf56adf456asdfasdf';
  appProperties = {
    VALUES: {
      KEY: 'MTIzNDU2Nzg5MEFCQ0RFRkdISUpLTE1O',
      IV: 'MTIzNDU2Nzg=',
    },
  };

  encryptionAES(msg: any) {
    // Encrypt
    const ciphertext = CryptoTS.AES.encrypt(msg, 'Tecnics.Com');
    return ciphertext.toString();
  }

  decryptionAES(msg: any) {
    // Decrypt
    const bytes = CryptoTS.AES.decrypt(msg, 'Tecnics.Com');
    const plaintext = bytes.toString(CryptoTS.enc.Utf8);
    return plaintext;
  }

  // for sign out
  signOut(): void {
    this.authService.signOut();
    this.authenticationService.logOut();

    // this.storage.clear('isLogedIn');
    // this.storage.clear('userPhoto');
    // this.storage.clear('userEmail');
    // this.storage.clear('matchID');
    // this.storage.clear('userID');
  }
}
