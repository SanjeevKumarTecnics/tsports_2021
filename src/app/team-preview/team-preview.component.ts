import { Component, OnInit } from '@angular/core';
import {ApiService} from '../Services/api.service'
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-team-preview',
  templateUrl: './team-preview.component.html',
  styleUrls: ['./team-preview.component.scss']
})
export class TeamPreviewComponent implements OnInit {

  matchId:any;

  constructor(private apiService:ApiService, private storage:LocalStorageService,
    private router:Router, private activatedRoute:ActivatedRoute) { }

  teamPreview:any = [];

  ngOnInit(): void {
    this.teamPreview = this.apiService.selectedPlayers;
  }

  async pushData(){
    var selectedPlayers = this.teamPreview;
    var players = [];
    var captain:any;
    var vice_captain:any;
    var man_of_match:any;
    for(var i=0; i<selectedPlayers.length;i++){
      players.push(selectedPlayers[i].pid);
      if(selectedPlayers[i].role === 'C'){
        captain = selectedPlayers[i].pid;
      }
      if(selectedPlayers[i].role === 'VC'){
        vice_captain = selectedPlayers[i].pid;
      }
      if(selectedPlayers[i].manRole === 'MM'){
        man_of_match = selectedPlayers[i].pid;
      }
    }

    var pushSelectedPlayers = {
      score : 0.0,  
      // user : this.storage.retrieve('userId')?this.storage.retrieve('userId'):this.apiService.userId,
      user : 137,
      match : this.storage.retrieve('matchID')?this.storage.retrieve('matchID'):this.apiService.matchId,
      captain : captain,
      vice_captain: vice_captain,
      man_of_the_match: man_of_match,
      players: players
    }
    
    // console.log(pushSelectedPlayers);

    let response = await this.apiService.postSelectPlayers(pushSelectedPlayers).then(res => {
      alert("Team Created Sucessfully ! Click on team Preview button To view your team");
      this.router.navigate(['/fantacy-team']); 
    });

  }

}
