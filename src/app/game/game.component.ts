import { Component, OnInit } from '@angular/core';
// todo - eventually, we will want to load the questions from a database in the backend, maybe...
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  animations: [
    trigger('openCloseQuestion', [
      state('open', style({
        backgroundColor: 'orange'
      })),
      state('closed', style({
        backgroundColor: 'turquoise'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('1s')
      ])
    ]),
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  currentPlayerName = '';

  constructor(public gameService: GameService, public router: Router) { }

  ngOnInit(): void {
  }

  changeQuestion() {
    this.gameService.changeQuestion();
  }

  removeQuestion() {
    this.gameService.removeQuestion();
  }

  hasQuestion() {
    return this.gameService.hasQuestion();
  }

  hasPlayers() {
    return this.gameService.hasPlayers();
  }

  setupNewPlayer() {
    this.gameService.finishCurrentPlayer(this.currentPlayerName);
    this.currentPlayerName = '';
  }

  finish() {
    this.router.navigate(['../finish']);
  }

  isTimerOn() {
    return this.gameService.isTimerOn();
  }

  getCurrentQuestion() {
    return this.gameService.currentQuestion.question;
  }

  getNumQuestions() {
    return this.gameService.getQuestionCount();
  }

}
