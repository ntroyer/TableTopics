import { Component, OnInit } from '@angular/core';
// todo - eventually, we will want to load the questions from a database in the backend, maybe...
import questions from '../questions/questions.json';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

import { Question, GameService } from './game.service';

interface Player {
  name: string;
  question: Question;
  time: string;
  answer: string;
}

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
  public gameQuestions: Question[] = questions;
  public prevQuestion: Question = this.gameService.getNewQuestion();
  
  currentPlayerName = '';
  players: Player[] = [];

  constructor(private gameService: GameService, public router: Router) { }

  ngOnInit(): void {
  }

  showQuestion() {
    const randomQuestion = this.gameQuestions[Math.floor(Math.random() * this.gameQuestions.length)];
    this.gameService.currentQuestion = randomQuestion;

    if (this.prevQuestion.question !== '') {
      this.gameQuestions.push(this.prevQuestion);
    }

    this.prevQuestion = randomQuestion;
    this.gameQuestions = this.gameQuestions.filter(item => item.question !== this.prevQuestion.question);
  }

  hasQuestion() {
    return this.gameService.hasQuestion();
  }

  hasPlayers() {
    return this.players.length > 0;
  }

  newPlayer() {
    this.finishCurrentPlayer();
    this.startNewPlayer();
  }

  private finishCurrentPlayer() {
    const player: Player = {
      name: this.currentPlayerName,
      question: this.gameService.currentQuestion,
      time: this.gameService.getCurrentTimeAsString(),
      answer: ''
    }
    this.players.push(player);
  }

  private startNewPlayer() {
    this.gameService.resetCurrentQuestion();
    this.gameService.resetTimer();
    this.currentPlayerName = '';
  }

  finish() {
    this.router.navigate(['../finish']);
  }

  removeQuestion() {
    this.prevQuestion = this.gameService.getNewQuestion();
    this.gameQuestions = this.gameQuestions.filter(item => item.question !== this.gameService.currentQuestion.question);
    this.showQuestion();
  }

  isTimerOn() {
    return this.gameService.isTimerOn();
  }

  getCurrentQuestion() {
    return this.gameService.currentQuestion.question;
  }

  getNumQuestions() {
    return this.gameQuestions.length;
  }

}
