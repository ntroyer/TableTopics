import { Component, OnInit } from '@angular/core';
// todo - eventually, we will want to load the questions from a database in the backend, maybe...
import questions from '../questions/questions.json';

interface Question {
  question: string;
  topic: string;
}

interface Player {
  name: string;
  question: Question;
  time: string;
  answer: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public gameQuestions: Question[] = questions;
  public currentQuestionObj: Question;
  public timerOn = false;
  public currentTime = 0;
  public currentTimeString: string;
  public interval: any;
  name = '';
  players: Player[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  showQuestion() {
    const randomQuestion = this.gameQuestions[Math.floor(Math.random() * this.gameQuestions.length)];
    this.currentQuestionObj = randomQuestion;
  }

  hasQuestion() {
    return typeof this.currentQuestionObj !== 'undefined' && this.currentQuestionObj.question !== '';
  }

  newPlayer() {
    // this will end the current player's session and start a new player
    
    this.finishCurrentPlayer();
    this.startNewPlayer();
  }

  private finishCurrentPlayer() {
    console.log('newPlayer');
    const player: Player = {
      name: this.name,
      question: this.currentQuestionObj,
      time: this.currentTimeString,
      answer: ''
    }
    this.players.push(player);
  }

  private startNewPlayer() {
    this.currentQuestionObj = {
      question: '',
      topic: ''
    };
    this.timerOn = false;
    this.currentTime = 0;
    this.currentTimeString = '';
    this.name = '';
  }

  finish() {
    // this will end the current table topics
    console.log('finish!!!');
  }

  toggleTimer() {
    this.timerOn = !this.timerOn;

    if (this.timerOn) {
      this.interval = setInterval(() => {
        this.currentTime++;
        const minutes = Math.floor(this.currentTime / (100 * 60));
        const seconds = Math.floor((this.currentTime - minutes * 100 * 60) / 100);
        const fract = Math.floor((this.currentTime - minutes * 100 * 60 - seconds * 100));
        this.currentTimeString = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds + ":" + (fract < 10 ? "0" : "") + fract;
      }, 10);
    } else {
      clearInterval(this.interval);
    }
  }

  isTimerOn() {
    return this.timerOn;
  }


}
