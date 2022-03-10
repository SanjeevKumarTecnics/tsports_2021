import { Component, OnInit } from '@angular/core';
import {ApiService} from '../Services/api.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  upcomingMatches:any = [];
  
  matchId:any;
   
  userName:any;

  yourTeam:any = [];


  constructor(private apiService:ApiService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.apiService.allMatches().then((res:any) =>{
      // showing upcoming matches
      var currentDate = new Date();
      for(var i=0; i<res.length;i++){
        var matchDate = new Date(res[i].date);
        if(+currentDate <= +matchDate){
          this.upcomingMatches.push(res[i]);
        }
      }
    })

  
    // check whether paremeter are passed or not
    if((window.location.pathname.indexOf(';matchId') == -1) || (window.location.pathname.indexOf(';userName') == -1)){
      this.router.navigate(['/fantacy-team']);
    }
    else{
      // check whether parameter are valid or not
      if(this.route.snapshot.paramMap.get('matchId')) {
        try {
         this.matchId = JSON.parse(this.apiService.decryptionAES(this.route.snapshot.paramMap.get('matchId')));
        } catch(e) {
            alert('Wrong Input');
        }
      }
      if(this.route.snapshot.paramMap.get('userName')) {
        try {
          this.userName = JSON.parse(this.apiService.decryptionAES(this.route.snapshot.paramMap.get('userName')));
        } catch(e) {
            alert('Wrong Input');
        }
      }

      if(this.matchId == null || this.matchId== "" || this.userName == null || this.userName == "" ){
        alert('Something Went Wrong');
        this.router.navigate(['/fantacy-team']);
      }else{
        this.apiService.userAlredyExistedInMatch(this.userName,this.matchId).then(res => {
          var players = res[0].players;
          for(var i=0;i<players.length;i++){
            if(players[i].pid == res[0].captain.pid){
              players[i].role = 'C';
            }
            if(players[i].pid == res[0].man_of_the_match.pid){
              players[i].manRole = 'MM';
            }
            if(players[i].pid == res[0].vice_captain.pid){
              players[i].role = 'VC';
            }
          }
          this.yourTeam = players;          
        });
      }
    }
  }
}
