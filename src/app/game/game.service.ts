import { Injectable } from '@angular/core';
// todo - eventually, we will want to load the questions from a database in the backend, maybe...
import questions from '../questions/questions.json';

export interface Question {
  question: string;
  topics: string[];
}

export interface Player {
  name: string;
  question: Question;
  time: string;
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public currentTime = 0;
  public currentTimeString = '';
  public defaultTimeString = '00:00:00';
  public timerOn = false;

  public gameQuestions: Question[] = questions;
  public currentQuestion: Question = this.getNewQuestion();
  public prevQuestion: Question = this.getNewQuestion();

  public players: Player[] = [];

  constructor() { }

  hasQuestion() {
    return this.isQuestionSet(this.currentQuestion);
  }

  changeQuestion() {
    const randomQuestion = this.getRandomQuestion();
    this.currentQuestion = randomQuestion;

    if (this.isQuestionSet(this.prevQuestion)) {
      this.gameQuestions.push(this.prevQuestion);
    }

    this.prevQuestion = randomQuestion;
    this.gameQuestions = this.gameQuestions.filter(item => item.question !== this.prevQuestion.question);
  }

  removeQuestion() {
    this.prevQuestion = this.getNewQuestion();
    this.gameQuestions = this.gameQuestions.filter(item => item.question !== this.currentQuestion.question);
    this.changeQuestion();
  }

  isQuestionSet(question: Question) {
    return question.question !== '';
  }

  hasPlayers() {
    return this.players.length > 0;
  }

  finishCurrentPlayer(name: string) {
    const player: Player = {
      name: name,
      question: this.currentQuestion,
      time: this.getCurrentTimeAsString(),
      answer: ''
    }
    this.players.push(player);
    this.resetCurrentQuestion();
    this.resetTimer();
  }

  getRandomQuestion() {
    return this.gameQuestions[Math.floor(Math.random() * this.gameQuestions.length)];
  }

  getQuestionCount() {
    return this.gameQuestions.length;
  }

  getCurrentTimeAsString() {
      return this.currentTimeString === '' ? this.defaultTimeString : this.currentTimeString;
  }

  setCurrentTimeAsString(time: string) {
    this.currentTimeString = time;
  }

  resetTimer() {
      this.currentTime = 0;
      this.currentTimeString = this.defaultTimeString;
  }

  resetCurrentQuestion() {
    this.currentQuestion = this.getNewQuestion()
  }

  getNewQuestion() {
    return { question: '', topics: [''] }
  }

  toggleTimerOn() {
    this.timerOn = !this.timerOn;
  }

  isTimerOn() {
    return this.timerOn;
  }

}
