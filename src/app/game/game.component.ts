import { Component, OnInit } from '@angular/core';
// todo - eventually, we will want to load the questions from a database in the backend, maybe...
import questions from '../questions/questions.json';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
  public currentQuestionObj: Question = {
    question: '',
    topic: ''
  };
  public prevQuestion: Question = {
    question: '',
    topic: ''
  };
  public timerOn = false;
  public currentTime = 0;
  public currentTimeString = '00:00:00';
  public interval: any;
  name = '';
  timerHidden = false;
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
    this.finishCurrentPlayer();
    this.startNewPlayer();
  }

  private finishCurrentPlayer() {
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
    this.resetTimer();
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

  resetTimer() {
    this.currentTime = 0;
    this.currentTimeString = '00:00:00';
  }

  toggleShowTimer() {
    this.timerHidden = !this.timerHidden;
  }

  isTimerHidden() {
    return this.timerHidden;
  }

  isTimerOn() {
    return this.timerOn;
  }

  hasTime() {
    return this.currentTime !== 0;
  }

  getTimerHiddenText() {
    if (this.isTimerOn()) {
      return "Timer is On";
    }

    return "Timer is Off";
  }

}
