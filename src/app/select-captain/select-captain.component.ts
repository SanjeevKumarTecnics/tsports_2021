import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {ApiService} from '../Services/api.service'
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TeamPreviewComponent} from '../team-preview/team-preview.component'

@Component({
  selector: 'app-select-captain',
  templateUrl: './select-captain.component.html',
  styleUrls: ['./select-captain.component.scss']
})
export class SelectCaptainComponent implements OnInit {
  selectedPlayers:any = [];

  setC:boolean = false;
  setVC:boolean =false;
  setMM:boolean = false;

  constructor(private apiService:ApiService, private router:Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.selectedPlayers = this.apiService.selectedPlayers;
    for(var p=0;p<this.selectedPlayers.length;p++){
      this.selectedPlayers[p].role = "P";
      this.selectedPlayers[p].disabledC = "";
      this.selectedPlayers[p].disabledVC = "";
      this.selectedPlayers[p].disabledMM = "";
    }
  }

  selectedCaptain(player:any,index:number,event:any){
    this.selectedPlayers[index].role = "C";
    // this.selectedPlayers[index].category = "C";
    this.selectedPlayers[index].disabledC = "";
    this.selectedPlayers[index].disabledVC = true;
    // this.selectedPlayers[index].disabledMM = true;
    for(var p=0;p<this.selectedPlayers.length;p++){
      if(p != index){
        this.selectedPlayers[p].disabledC = true; 
      }else{
        this.selectedPlayers[p].disabledC = true; 
      }
    } 
    if(event.currentTarget.checked){
      this.setC = true;
    }else{
      this.setC = false;
    }
  }

  selectedVoiceCaptain(player:any,index:number,event:any){
    this.selectedPlayers[index].role = "VC";
    // this.selectedPlayers[index].category = "VC";
    this.selectedPlayers[index].disabledVC = "";
    this.selectedPlayers[index].disabledC = true;
    // this.selectedPlayers[index].disabledMM = true;
    for(var p=0;p<this.selectedPlayers.length;p++){
      if(p != index){
        this.selectedPlayers[p].disabledVC = true; 
      }else{
        this.selectedPlayers[p].disabledVC = true; 
      }
    }
    if(event.currentTarget.checked){
      this.setVC = true;
    }else{
      this.setVC = false;
    }
  }

  selectedMM(player:any,index:number,event:any){
    this.selectedPlayers[index].manRole = "MM";
    // this.selectedPlayers[index].category = "MM";
    // this.selectedPlayers[index].disabledVC = true;
    // this.selectedPlayers[index].disabledC = true;
    this.selectedPlayers[index].disabledMM = "";
    for(var p=0;p<this.selectedPlayers.length;p++){
      if(p != index){
        this.selectedPlayers[p].disabledMM = true; 
      }else{
        this.selectedPlayers[p].disabledMM = true;
      }
    }
    if(event.currentTarget.checked){
      this.setMM = true;
    }else{
      this.setMM = false;
    }
  }

  teamPreview(){
    const dialogRef = this.dialog.open(TeamPreviewComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedPlayers.map((x:any)=>x.manRole="");
    });
    this.apiService.selectedPlayers = this.selectedPlayers;
  }
}
