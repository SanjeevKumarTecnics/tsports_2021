import { Component, OnInit, Inject } from '@angular/core';
import {ApiService} from '../Services/api.service'
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner"; 

@Component({
  selector: 'app-individual-match-score',
  templateUrl: './individual-match-score.component.html',
  styleUrls: ['./individual-match-score.component.scss']
})
export class IndividualMatchScoreComponent implements OnInit {

  individualTeamScore:any = [];

  noResult:any;

  constructor(private apiService:ApiService,@Inject(MAT_DIALOG_DATA) public data:{'matchID':any,'teamTitel':any},
  private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    this.apiService.getYerstadyScores(this.data.matchID).then(res =>{
      if(res.length != 0){
        for(var i=0; i<res.length;i++){
          this.individualTeamScore = res;
        }
      }
      else{
        this.noResult = "No Result Found !";
      }
      this.SpinnerService.hide(); 
    });
  }

}
