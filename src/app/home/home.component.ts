import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isToggleTimerChecked = this.gameService.showTimer;

  constructor(public router: Router, public gameService: GameService) { }

  ngOnInit(): void {
  }

  startGame() {
    this.clearPlayerStorage();
    this.router.navigate(['../game']);
  }

  toggleTimer(isChecked: boolean) {
    this.gameService.showTimer = isChecked;
  }

  clearPlayerStorage() {
    sessionStorage.clear();
  }

}
