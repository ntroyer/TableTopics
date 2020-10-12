import { Injectable } from '@angular/core';

export interface Question {
  question: string;
  topic: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public currentTime = 0;
  public currentTimeString = '';
  public defaultTimeString = '00:00:00';
  public timerOn = false;

  public currentQuestion: Question = {
    question: '',
    topic: ''
  }

  constructor() { }

  hasQuestion() {
      return this.currentQuestion.question !== '';
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
    this.currentQuestion = {
      question: '',
      topic: ''
    }
  }

  toggleTimerOn() {
    this.timerOn = !this.timerOn;
  }

  isTimerOn() {
    return this.timerOn;
  }

}
