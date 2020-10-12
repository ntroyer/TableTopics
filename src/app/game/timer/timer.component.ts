import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { GameService } from '../game.service';

@Component({
  selector: 'app-timer',
  animations: [
    trigger('changeTimerColor', [
      state('early', style({
        backgroundColor: 'lightblue'
      })),
      state('green', style({
        backgroundColor: 'lightgreen'
      })),
      state('yellow', style({
        backgroundColor: 'yellow'
      })),
      state('red', style({
        backgroundColor: 'red'
      })),
      state('death', style({
        backgroundColor: 'crimson'
      })),
      transition('early => green', [
        animate('1s')
      ]),
      transition('green => yellow', [
        animate('1s')
      ]),
      transition('yellow => red', [
        animate('1s')
      ]),
      transition('red => death', [
        animate('1s')
      ]),
      transition('death => early', [
        animate('1s')
      ]),
      transition('red => early', [
        animate('1s')
      ]),
      transition('yellow => early', [
        animate('1s')
      ]),
      transition('green => early', [
        animate('1s')
      ]),
      transition('early => yellow', [
        animate('1s')
      ]),
      transition('early => red', [
        animate('1s')
      ]),
      transition('early => crimson', [
        animate('1s')
      ])
    ])
  ],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  public interval: any;
  timerHidden = false;

  greenTime = 60;
  yellowTime = 90;
  redTime = 120;
  deathTime = 150;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  toggleTimer() {
    this.gameService.toggleTimerOn();

    if (this.gameService.isTimerOn()) {
      this.interval = setInterval(() => {
        this.gameService.currentTime++;

        const currentTime = this.gameService.currentTime;
        const minutes = Math.floor(currentTime / (100 * 60));
        const seconds = Math.floor((currentTime - minutes * 100 * 60) / 100);
        const fract = Math.floor((currentTime - minutes * 100 * 60 - seconds * 100));

        const currentTimeString = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds + ":" + (fract < 10 ? "0" : "") + fract;
        this.gameService.setCurrentTimeAsString(currentTimeString);
      }, 10);
    } else {
      clearInterval(this.interval);
    }
  }

  toggleShowTimer() {
    this.timerHidden = !this.timerHidden;
  }

  isTimerHidden() {
    return this.timerHidden;
  }

  hasTime() {
    return this.gameService.currentTime !== 0;
  }

  hasQuestion() {
    return this.gameService.hasQuestion();
  }

  getTimerHiddenText() {
    if (this.gameService.isTimerOn()) {
      return "Timer is On";
    }

    return "Timer is Off";
  }

  getTimerColor() {
    let time = this.gameService.currentTime / 100;

    if (this.isTimerHidden()) {
      return 'early';
    }

    if (time >= this.greenTime && time < this.yellowTime) {
      return 'green';
    }
    if (time >= this.yellowTime && time < this.redTime) {
      return 'yellow';
    }
    if (time >= this.redTime && time < this.deathTime) {
      return 'red';
    }
    if (time >= this.deathTime) {
      return 'death';
    }
    return 'early';
  }

  resetTimer() {
    this.gameService.resetTimer();
  }

  isTimerOn() {
    return this.gameService.isTimerOn();
  }

  getCurrentTimeAsString() {
    return this.gameService.getCurrentTimeAsString();
  }

}
