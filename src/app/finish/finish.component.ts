import { Component, OnInit } from '@angular/core';
import { GameService } from '../game/game.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  constructor(public gameService: GameService) { }

  ngOnInit(): void {
  }

}
