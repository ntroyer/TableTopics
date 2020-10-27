import { Injectable } from '@angular/core';
// todo - eventually, we will want to load the questions from a database in the backend, maybe...
import questions from '../questions/questions.json';

export interface Question {
  text: string;
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
  public showTimer = true;
  public noDuplicateQuestions = true;

  public gameQuestions: Question[] = questions;
  public currentQuestion: Question = this.getNewQuestion();
  public prevQuestion: Question = this.getNewQuestion();

  public players: Player[] = this.createPlayersFromSession();

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
    this.gameQuestions = this.gameQuestions.filter(item => item.text !== this.prevQuestion.text);
  }

  removeQuestion() {
    this.prevQuestion = this.getNewQuestion();
    this.gameQuestions = this.gameQuestions.filter(item => item.text !== this.currentQuestion.text);
    this.changeQuestion();
  }

  removeDuplicateQuestion() {
    this.prevQuestion = this.getNewQuestion();
    this.gameQuestions = this.gameQuestions.filter(item => item.text !== this.currentQuestion.text);
  }

  isQuestionSet(question: Question) {
    return question.text !== '';
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
    this.storePlayerInSession(player);

    if (this.noDuplicateQuestions) {
      this.removeDuplicateQuestion();
    }

    this.resetCurrentQuestion();
    this.resetTimer();
  }

  createPlayersFromSession() {
    const numplayers: number = +sessionStorage.getItem('numplayers');
    const players: Player[] = [];

    if (numplayers < 1) {
      return players;
    }

    for (let i = 1; i <= numplayers; i++) {
      const playername = sessionStorage.getItem('player' + i +  '_name');
      const playerquestiontext = sessionStorage.getItem('player' + i + '_questiontext');
      const playertime = sessionStorage.getItem('player' + i + '_time');

      const question = {
        text: playerquestiontext, 
        topics: []
      }

      if (playername) {
        players.push({
          name: playername,
          question: question,
          time: playertime,
          answer: ''
        })
      }
    }

    return players;
  }

  storePlayerInSession(player: Player) {
    const playerCount = this.players.length;
    sessionStorage.setItem('player' + playerCount + "_name", player.name);
    sessionStorage.setItem('player' + playerCount + "_questiontext", player.question.text);
    sessionStorage.setItem('player' + playerCount + "_time", player.time);
    sessionStorage.setItem('numplayers', playerCount.toString());
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
    return { text: '', topics: [''] }
  }

  toggleTimerOn() {
    this.timerOn = !this.timerOn;
  }

  isTimerOn() {
    return this.timerOn;
  }

}
