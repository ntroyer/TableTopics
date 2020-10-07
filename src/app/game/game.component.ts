import { Component, OnInit } from '@angular/core';
// todo - eventually, we will want to load the questions from a database in the backend, maybe...
import * as questions from '../questions/questions.json';

interface Question {
  question: String;
  topic: String;
}

interface Player {
  name: string;
  question: Question;
  answer: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  questions: Question[] = questions.default;

  public currentQuestionObj: Question;

  constructor() { }

  ngOnInit(): void {
  }

  showQuestion() {
    const randomQuestion = this.questions[Math.floor(Math.random() * this.questions.length)];
    this.currentQuestionObj = randomQuestion;
  }

  hasQuestion() {
    return typeof this.currentQuestionObj !== 'undefined';
  }

  newPlayer() {
    console.log('newPlayer');
  }

  finish() {
    console.log('finish!!!');
  }


}
